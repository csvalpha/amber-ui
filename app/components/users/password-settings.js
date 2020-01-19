import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  ajax: service(),
  flashNotice: service(),
  isSaveButtonDisabled: computed('password', 'passwordConfirmation', function() {
    return this.password === undefined
      || this.password.length < 12
      || this.password !== this.passwordConfirmation;
  }),
  actions: {
    changePassword() {
      this.set('passwordErrorMessage', null);
      const userId = this.get('model.id');
      this.ajax.patch(`/users/${userId}`, {
        /* eslint-disable camelcase */
        data: {
          data: {
            id: userId,
            type: 'users',
            attributes: {
              password: this.password,
              old_password: this.oldPassword
            }
          }
        }
        /* eslint-enable camelcase */
      }).then(() => {
        this.set('oldPassword', '');
        this.set('password', '');
        this.set('passwordConfirmation', '');
        this.flashNotice.sendSuccess('Wachtwoord succesvol aangepast!');
        this.transitionToRoute('users.show-security', userId);
      }).catch((error) => {
        this.set('passwordErrorMessage', error.payload.errors ? error.payload.errors[0].detail : error.payload);
      });
    }
  }
});
