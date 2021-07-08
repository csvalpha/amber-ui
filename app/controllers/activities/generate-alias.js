import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isInvalidResponse } from 'ember-fetch/errors';

export default Controller.extend({
  fetch: service(),
  errorMessage: null,
  actions: {
    async generateAlias() {
      this.set('errorMessage', null);
      const response = await this.fetch.post(`/activities/${this.model.id}/generate_alias`);

      if (response.ok) {
        const json = await response.json();
        this.set('alias', json.data.alias);
        this.set('expires_at', json.data.expires_at);
      } else if (isInvalidResponse(response)) {
        const json = await response.json();
        this.set('errorMessage', json.errors ? json.errors[0].detail : response);
      }
    }
  }
});
