import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isInvalidResponse } from 'ember-fetch/errors';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AcceptController extends Controller {
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
      this.transitionToRoute('mail-moderations.index');
    } else if (isInvalidResponse(response)) {
      const json = await response.json();
      this.errorMessage = json.errors[0].detail;
    }
  }
}
