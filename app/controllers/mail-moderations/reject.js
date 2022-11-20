import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isInvalidResponse } from 'ember-fetch/errors';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RejectController extends Controller {
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
