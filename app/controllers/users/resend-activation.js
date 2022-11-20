import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isNotFoundResponse } from 'ember-fetch/errors';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ResendActivationController extends Controller {
  @service fetch;
  @tracked errorMessage;
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
