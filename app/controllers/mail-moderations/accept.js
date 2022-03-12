import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isInvalidResponse } from 'ember-fetch/errors';

export default Controller.extend({
  fetch: service(),
  errorMessage: null,
  actions: {
    async submit() {
      this.set('errorMessage', null);
      const response = await this.fetch.post(
        `/stored_mails/${this.model.id}/accept`
      );

      if (response.ok) {
        this.model.unloadRecord();
        this.transitionToRoute('mail-moderations.index');
      } else if (isInvalidResponse(response)) {
        const json = await response.json();
        this.set('errorMessage', json.errors[0].detail);
      }
    },
  },
});
