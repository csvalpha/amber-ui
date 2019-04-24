import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { GroupKinds } from 'alpha-amber/constants';
import { all } from 'rsvp';

export default Controller.extend({
  flashNotice: service('flash-notice'),
  session: service(),
  _groupKindToOption: groupKind => {
    return {
      value: groupKind,
      label: groupKind.capitalize()
    };
  },

  groupKindOptions: computed(function() {
    return GroupKinds.map(this.get('_groupKindToOption'));
  }),

  users: computed(function() {
    return this.get('store').findAll('user');
  }),

  actions: {
    addUser(user) {
      this.get('model').get('memberships').pushObject(
        this.get('store').createRecord('membership', {
          user,
          endDate: null
        })
      );
    },
    removeMembership(membership) {
      membership.deleteRecord();
    },
    submit() {
      const group = this.get('model');
      const flashNotice = this.get('flashNotice');
      const membershipErrors = new A();

      if (group !== undefined) {
        let failedMembershipSavings = 0;
        group.save().then(() => {
          return all(group.get('memberships').map((membership) => {
            if (membership.get('hasDirtyAttributes')) {
              return membership.save().catch((error) => {
                membershipErrors.push({ membership, error });
                failedMembershipSavings++;
              });
            }
          })
          );
        }).then(() => {
          if (failedMembershipSavings) {
            const prefix = failedMembershipSavings > 1 ? 'zijn' : 'is';
            const suffix = failedMembershipSavings > 1 ? 'lidmaatschappen' : 'lidmaatschap';

            const membershipErrorText = membershipErrors.reduce((errorMessage, membershipError) => {
              const singleError = `\t ${membershipError.membership.get('user.fullName')} (${membershipError.error.errors[0].source.pointer}) \n`;
              return errorMessage + singleError;
            }, '');
            this.set('errorMessage', `Er ${prefix} ${failedMembershipSavings} ${suffix} niet juist opgeslagen: \n ${membershipErrorText}`);
          } else {
            flashNotice.sendSuccess('Groep aangepast!');
            this.transitionToRoute('groups.show', group.id);
          }
        }).catch(error => {
          this.set('errorMessage', error.message);
        });
      }
    },
    fileLoaded(file) {
      const group = this.get('model');
      group.set('avatar', file.data);
    }
  }
});
