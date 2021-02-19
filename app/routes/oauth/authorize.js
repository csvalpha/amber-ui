import { ApplicationRoute } from 'alpha-amber/routes/application/application';
import { inject as service } from '@ember/service';

export default class OauthAuthorizeRoute extends ApplicationRoute {
  @service fetch
  @service router

  init() {
    super.init(...arguments);

    this.router.on('routeDidChange', event => {
      // When routeDidChange is not oauth.authorize, skip
      if (event.targetName !==  'oauth.authorize') {
        return;
      }

      // Get client id from the API
      const clientId = event.to.queryParams.client_id;
      const redirectUri = event.to.queryParams.redirect_uri;
      const responseType = event.to.queryParams.response_type;
      const { state, scope } = event.to.queryParams;

      this.fetch.fetch(`/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&state=${state}&scope=${scope}`
      ).then(response => {
        response.json().then(json => {
          // If user already authenticated redirect, otherwise show client name
          if (json.status === 'redirect') {
            location.href = json.redirect_uri;
          } else {
            this.controller.set('clientName', json.client_name);
          }
        });
      });
    });
  }
}
