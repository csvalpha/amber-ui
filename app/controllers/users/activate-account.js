import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import { isNone } from '@ember/utils';
import { isNotFoundResponse } from 'ember-fetch/errors';

export default Controller.extend({
  fetch: service(),

  isSaveButtonDisabled: computed('password.length', 'passwordConfirmation', function() {
    return isNone(this.password) || this.password.length < 12 || this.password !== this.passwordConfirmation;
  }),
  infoMessage: computed('password.length', 'passwordConfirmation', function() {
    if (isNone(this.password)) {
      return 'Voer een wachtwoord in van minimaal 12 tekens.';
    } else if (this.password.length < 12) {
      return `Uw wachtwoord bestaat uit ${this.password.length} tekens. Uw wachtwoord moet minimaal 12 tekens bevatten.`;
    } else if (isNone(this.passwordConfirmation) || this.password !== this.passwordConfirmation) {
      return 'De 2 wachtwoorden komen niet overeen.';
    }

    return false;
  }),

  queryParams: ['activation_token'],

  actions: {
    async resetPassword() {
      const userId = this.get('model.id');
      const response = await this.fetch.post(`/users/${userId}/activate_account`,
        { body: { password: this.password, passwordConfirmation: this.passwordConfirmation, activationToken: this.activation_token } }
      );

      if (response.ok) {
        this.set('successMessage', 'Wachtwoord is aangepast');
        run.later(() => {
          this.transitionToRoute('login');
        }, 2000);
      } else if (isNotFoundResponse(response)) {
        this.set('errorMessage', 'Token niet geldig, vraag een nieuwe aan');
      } else {
        this.set('errorMessage', 'Er ging iets mis...');
      }
    }
  }
});
