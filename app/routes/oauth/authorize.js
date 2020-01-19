import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  fetch: service(),

  actions: {
    didTransition() {
      const clientId = this.controller.get('client_id');
      const redirectUri = this.controller.get('redirect_uri');
      const responseType = this.controller.get('response_type');
      const state = this.controller.get('state');
      const scope =  this.controller.get('scope');

      this.fetch.fetch(`/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&state=${state}&scope=${scope}`
      ).then(response => {
        response.json().then(json => {
          if (json.status === 'redirect') {
            location.href = json.redirect_uri;
          } else {
            this.controller.set('clientName', json.client_name);
          }
        });
      });
    }
  }

});
