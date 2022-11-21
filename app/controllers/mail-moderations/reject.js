import Controller from '@ember/controller';
import { action } from '@ember/object';
import { isInvalidResponse } from 'ember-fetch/errors';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MailModerationRejectController extends Controller {
  @service fetch;
  @service flashNotice;

  @tracked errorMessage = null;

  @action
  async submit() {
    this.errorMessage = null;
    const response = await this.fetch.post(
      `/stored_mails/${this.model.id}/reject`
    );

    if (response.ok) {
      this.flashNotice.sendSuccess('Mail moderatie afgewezen!');
      this.model.unloadRecord();
      this.transitionToRoute('mail-moderations.index');
    } else if (isInvalidResponse(response)) {
      const json = await response.json();
      this.errorMessage = json.error;
    }
  }
}
