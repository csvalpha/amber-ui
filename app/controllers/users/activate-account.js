import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { isNone } from '@ember/utils';
import { isNotFoundResponse } from 'ember-fetch/errors';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ActivateAccountController extends Controller {
  @service fetch;
  queryParams = ['activation_token'];
  @tracked password;
  @tracked passwordConfirmation;
  @tracked successMessage;
  @tracked errorMessage;

  get isSaveButtonDisabled() {
    return (
      isNone(this.password) ||
      this.password.length < 12 ||
      this.password !== this.passwordConfirmation
    );
  }

  get infoMessage() {
    if (isNone(this.password)) {
      return 'Voer een wachtwoord in van minimaal 12 tekens.';
    } else if (this.password.length < 12) {
      return `Uw wachtwoord bestaat uit ${this.password.length} tekens. Uw wachtwoord moet minimaal 12 tekens bevatten.`;
    } else if (
      isNone(this.passwordConfirmation) ||
      this.password !== this.passwordConfirmation
    ) {
      return 'De 2 wachtwoorden komen niet overeen.';
    }
    return false;
  }

  @action
  async resetPassword() {
    const response = await this.fetch.post(
      `/users/${this.model.id}/activate_account`,
      {
        body: {
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
          activationToken: this.activation_token,
        },
      }
    );

    if (response.ok) {
      this.successMessage = 'Wachtwoord is aangepast';
      run.later(() => {
        this.transitionToRoute('login');
      }, 2000);
    } else if (isNotFoundResponse(response)) {
      this.errorMessage = 'Token niet geldig, vraag een nieuwe aan';
    } else {
      this.errorMessage = 'Er ging iets mis...';
    }
  }
}
