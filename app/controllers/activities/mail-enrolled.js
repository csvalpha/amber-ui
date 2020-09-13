import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isInvalidResponse } from 'ember-fetch/errors';

export default Controller.extend({
  fetch: service(),
  errorMessage: null,
  actions: {
    async submit() {
      this.set('errorMessage', null);
      if (this.message && this.message.trim().length > 0) {
        const response = await this.fetch.post(`/activities/${this.model.id}/mail_enrolled`, {
          body: {
            data: {
              attributes: {
                message: this.message
              }
            }
          }
        });

        if (response.ok) {
          this.set('message', null);
          this.transitionToRoute('activities.show', this.model.id);
        } else if (isInvalidResponse(response)) {
          const json = await response.json();
          this.set('errorMessage', json.errors ? json.errors[0].detail : response);
        }
      }
    }
  }
});
