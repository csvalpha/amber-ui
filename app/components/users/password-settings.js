import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  ajax: service(),
  flashNotice: service(),
  isSaveButtonDisabled: computed('password', 'passwordConfirmation', function() {
    return this.get('password') === undefined
      || this.get('password').length < 12
      || this.get('password') !== this.get('passwordConfirmation');
  }),
  actions: {
    changePassword() {
      this.set('passwordErrorMessage', null);
      const userId = this.get('model.id');
      this.get('ajax').patch(`/users/${userId}`, {
        /* eslint-disable camelcase */
        data: {
          data: {
            id: userId,
            type: 'users',
            attributes: {
              password: this.get('password'),
              old_password: this.get('oldPassword')
            }
          }
        }
        /* eslint-enable camelcase */
      }).then(() => {
        this.set('oldPassword', '');
        this.set('password', '');
        this.set('passwordConfirmation', '');
        this.get('flashNotice').sendSuccess('Wachtwoord succesvol aangepast!');
        this.transitionToRoute('users.show-security', userId);
      }).catch((error) => {
        this.set('passwordErrorMessage', error.payload.errors ? error.payload.errors[0].detail : error.payload);
      });
    }
  }
});
