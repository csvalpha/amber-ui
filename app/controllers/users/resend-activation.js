import Controller from '@ember/controller';
import { action } from '@ember/object';
import { isNotFoundResponse } from 'ember-fetch/errors';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class UserResendActivationController extends Controller {
  @service fetch;

  @tracked errorMessage = null;

  @action
  async resendActivation() {
    this.errorMessage = null;
    const response = await this.fetch.post(
      `/users/${this.model.id}/resend_activation_mail`
    );
    if (response.ok) {
      this.transitionToRoute('users.show', this.model);
    } else if (isNotFoundResponse(response)) {
      this.errorMessage = 'Deze gebruiker is al geactiveerd!';
    } else {
      this.errorMessage = 'Er is wat fout gegaan.';
    }
  }
}
