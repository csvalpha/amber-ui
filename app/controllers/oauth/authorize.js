import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  ajax: service(),

  /* eslint-disable camelcase */
  queryParams: ['client_id', 'redirect_uri', 'response_type', 'state'],
  /* eslint-enable camelcase */

  actions: {
    authorize() {
      this.get('ajax').post('/oauth/auth_code_redirect_uri', {
        data: {
          /* eslint-disable camelcase */
          client_id: this.get('client_id'),
          redirect_uri: this.get('redirect_uri'),
          response_type: this.get('response_type'),
          state: this.get('state')
          /* eslint-enable camelcase */
        }
      }).then((result) => {
        if (result.auth) {
          const response = JSON.parse(result.auth);

          if (response.error && response.error === 'invalid_client') {
            this.set('errorMessage', 'Client ID unknown');
          } else if (response.redirect_uri) {
            location.href = response.redirect_uri;
          } else {
            this.set('errorMessage', 'Unknown error');
          }
        }
      }).catch((error) => {
        this.set('errorMessage', error.message);
      });
    }
  }
});
