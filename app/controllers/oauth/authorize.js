import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class OauthAuthorizeController extends Controller {
  @service fetch;

  @tracked clientName = null;

  queryParams = [
    'client_id',
    'redirect_uri',
    'response_type',
    'state',
    'scope',
  ];

  @action
  async authorize() {
    const response = await this.fetch.fetch('/oauth/authorize', {
      /* eslint-disable camelcase */
      body: JSON.stringify({
        client_id: this.client_id,
        redirect_uri: this.redirect_uri,
        response_type: this.response_type,
        state: this.state,
        scope: this.scope,
      }),
      /* eslint-enable camelcase */
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (json.error) {
      this.errorMessage = json.error_description;
    } else if (json.redirect_uri) {
      location.href = json.redirect_uri;
    } else {
      this.errorMessage = 'Unknown error';
    }
  }
}
