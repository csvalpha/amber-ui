import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isInvalidResponse } from 'ember-fetch/errors';

export default Component.extend({
  fetch: service(),
  flashNotice: service(),
  isSaveButtonDisabled: computed(
    'password.length',
    'passwordConfirmation',
    function () {
      return (
        this.password === undefined ||
        this.password.length < 12 ||
        this.password !== this.passwordConfirmation
      );
    }
  ),
  actions: {
    async changePassword() {
      this.set('passwordErrorMessage', null);
      const userId = this.model.id;
      let response = await this.fetch.fetch(`/users/${userId}`, {
        /* eslint-disable camelcase */
        body: JSON.stringify({
          data: {
            id: userId,
            type: 'users',
            attributes: {
              password: this.password,
              old_password: this.oldPassword,
            },
          },
        }),
        /* eslint-enable camelcase */
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
        method: 'PATCH',
      });

      if (response.ok) {
        this.set('oldPassword', '');
        this.set('password', '');
        this.set('passwordConfirmation', '');
        this.flashNotice.sendSuccess('Wachtwoord succesvol aangepast!');
        this.transitionToRoute('users.user.security', userId);
      } else if (isInvalidResponse(response)) {
        let json = await response.json();
        this.set(
          'passwordErrorMessage',
          json.errors ? json.errors[0].detail : response
        );
      }
    },
  },
});
