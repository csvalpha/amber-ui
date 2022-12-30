import Controller from '@ember/controller';
import { action } from '@ember/object';
import { isInvalidResponse } from 'ember-fetch/errors';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MailModerationAcceptController extends Controller {
  @service fetch;

  @tracked errorMessage = null;

  @action
  async submit() {
    this.errorMessage = null;
    const response = await this.fetch.post(
      `/stored_mails/${this.model.id}/accept`
    );
    if (response.ok) {
      this.model.unloadRecord();
      this.transitionToRoute('mail-moderations');
    } else if (isInvalidResponse(response)) {
      const json = await response.json();
      this.errorMessage = json.errors[0].detail;
    }
  }
}
