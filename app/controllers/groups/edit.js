import { action, computed } from '@ember/object';
import { A } from '@ember/array';
import Controller from '@ember/controller';
import { GroupKinds } from 'alpha-amber/constants';
import { all } from 'rsvp';
import { capitalize } from '@ember/string';
import { inject as service } from '@ember/service';

export default class EditGroupController extends Controller {
  @service('flash-notice') flashNotice;
  @service session;

  _groupKindToOption(groupKind) {
    return {
      value: groupKind,
      label: capitalize(groupKind)
    };
  }

  @computed('_groupKindToOption', function() {
    return GroupKinds.map(this._groupKindToOption);
  })
  groupKindOptions;

  @computed('store', function() {
    return this.store.findAll('user');
  })
  users;

  @action
  addUser(user) {
    this.model.get('memberships').pushObject(
      this.store.createRecord('membership', {
        user,
        endDate: null
      })
    );
  }

  @action
  removeMembership(membership) {
    membership.deleteRecord();
  }

  @action
  submit() {
    const membershipErrors = A();

    if (this.model !== undefined) {
      let failedMembershipSavings = 0;
      this.model.save().then(() => {
        return all(this.model.get('memberships').map((membership) => {
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
          this.flashNotice.sendSuccess('Groep aangepast!');
          this.transitionToRoute('groups.show', this.model.id);
        }
      }).catch(error => {
        this.set('errorMessage', error.message);
      });
    }
  }

  @action
  fileLoaded(file) {
    this.model.set('avatar', file.data);
  }
}
