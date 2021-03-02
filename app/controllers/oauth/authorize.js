import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  fetch: service(),
  clientName: null,

  /* eslint-disable camelcase */
  queryParams: ['client_id', 'redirect_uri', 'response_type', 'state', 'scope'],
  /* eslint-enable camelcase */

  actions: {
    authorize() {
      this.fetch.fetch('/oauth/authorize', {
        body: JSON.stringify({
          /* eslint-disable camelcase */
          client_id: this.client_id,
          redirect_uri: this.redirect_uri,
          response_type: this.response_type,
          state: this.state,
          scope: this.scope
          /* eslint-enable camelcase */
        }),
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }).then(response => {
        response.json().then(json => {
          if (json.error) {
            this.set('errorMessage', json.error_description);
          } else if (json.redirect_uri) {
            location.href = json.redirect_uri;
          } else {
            this.set('errorMessage', 'Unknown error');
          }
        });
      });
    }
  }
});
