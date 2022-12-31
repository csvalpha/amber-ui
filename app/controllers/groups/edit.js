import { action } from '@ember/object';
import { A } from '@ember/array';
import { GroupKinds } from 'amber-ui/constants';
import { all } from 'rsvp';
import { capitalize } from '@ember/string';
import { inject as service } from '@ember/service';
import EditController from '../application/edit';

export default class EditGroupController extends EditController {
  @service session;
  successMessage = 'Groep aangepast!';
  successTransitionTarget = 'groups.show';

  _groupKindToOption(groupKind) {
    return {
      value: groupKind,
      label: capitalize(groupKind),
    };
  }

  get groupKindOptions() {
    return GroupKinds.map(this._groupKindToOption);
  }

  get users() {
    return this.store.findAll('user');
  }

  @action
  addUser(user) {
    this.model.get('memberships').pushObject(
      this.store.createRecord('membership', {
        user,
        endDate: null,
      })
    );
  }

  @action
  removeMembership(membership) {
    membership.deleteRecord();
  }

  @action
  async submit() {
    // todo: take a good look at this method, and see if its can be simplified to conform more to the
    //  EditController + model-save-utils pattern
    // Especially the error handling has to be cleaned up heavily. It's hard to read and understand what's going on
    const membershipErrors = A();

    if (this.model !== undefined) {
      let failedMembershipSavings = 0;
      try {
        await this.model.save();
        await all(
          this.model.get('memberships').map((membership) => {
            if (membership.get('hasDirtyAttributes')) {
              return membership.save().catch((error) => {
                membershipErrors.push({ membership, error });
                failedMembershipSavings++;
              });
            }
          })
        );
        if (failedMembershipSavings) {
          const prefix = failedMembershipSavings > 1 ? 'zijn' : 'is';
          const suffix =
            failedMembershipSavings > 1 ? 'lidmaatschappen' : 'lidmaatschap';

          const membershipErrorText = membershipErrors.reduce(
            (errorMessage, membershipError) => {
              const singleError = `\t ${membershipError.membership.get(
                'user.fullName'
              )} (${membershipError.error.errors[0].source.pointer}) \n`;
              return errorMessage + singleError;
            },
            ''
          );

          this.errorMessage = `Er ${prefix} ${failedMembershipSavings} ${suffix} niet juist opgeslagen: \n ${membershipErrorText}`;
        } else {
          this.modelSaveUtil.onSuccess();
        }
      } catch (error) {
        this.modelSaveUtil.onError(error);
      }
    }
  }

  @action
  fileLoaded(file) {
    this.model.set('avatar', file.data);
  }
}
