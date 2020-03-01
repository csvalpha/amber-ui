import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isInvalidResponse } from 'ember-fetch/errors';

export default Controller.extend({
  fetch: service(),
  errorMessage: null,
  actions: {
    async submit() {
      const id = this.get('model.id');
      this.set('errorMessage', null);
      const response = await this.fetch.post(`/stored_mails/${id}/reject`);

      if (response.ok) {
        this.model.unloadRecord();
        this.transitionToRoute('mail-moderations.index');
      } else if (isInvalidResponse(response)) {
        const json = await response.json();
        this.set('errorMessage', json.error);
      }
    }
  }
});
