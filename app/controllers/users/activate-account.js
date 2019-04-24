import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import { isNone } from '@ember/utils';
import { isNotFoundError } from 'ember-ajax/errors';

export default Controller.extend({
  ajax: service(),
  i18n: service(),

  isSaveButtonDisabled: computed('password', 'passwordConfirmation', function() {
    return isNone(this.get('password')) || this.get('password').length < 12 || this.get('password') !== this.get('passwordConfirmation');
  }),
  infoMessage: computed('password', 'passwordConfirmation', function() {
    if (isNone(this.get('password'))) {
      return 'Voer een wachtwoord in van minimaal 12 tekens.';
    } else if (this.get('password').length < 12) {
      return `Uw wachtwoord bestaat uit ${this.get('password').length} tekens. Uw wachtwoord moet minimaal 12 tekens bevatten.`;
    } else if (isNone(this.get('passwordConfirmation')) || this.get('password') !== this.get('passwordConfirmation')) {
      return 'De 2 wachtwoorden komen niet overeen.';
    }
    return false;
  }),

  queryParams: ['activation_token'],

  actions: {
    resetPassword() {
      const password = this.get('password');
      const passwordConfirmation = this.get('passwordConfirmation');
      const activationToken = this.get('activation_token');
      const userId = this.get('model.id');
      const activateAccountRequest = this.get('ajax').post(`/users/${userId}/activate_account`,
        { data: { password, passwordConfirmation, activationToken } }
      );
      activateAccountRequest.then(() => {
        this.set('successMessage', this.get('i18n').t('Wachtwoord is aangepast'));
        run.later(() => {
          this.transitionToRoute('login');
        }, 2000);
      }).catch(error => {
        let errorMessage = this.get('i18n').t('Er ging iets mis...');
        if (isNotFoundError(error)) {
          errorMessage = this.get('i18n').t('Token niet geldig, vraag een nieuwe aan');
        }
        this.set('errorMessage', errorMessage);
      });
    }
  }
});
