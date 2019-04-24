import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';

export default AjaxService.extend({
  session: service(),
  namespace: ENV.api.hostname,

  headers: computed('session.data.authenticated.access_token', {
    get() {
      const headers = {};

      const accessToken = this.get('session.data.authenticated.access_token');
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      return headers;
    }
  })
});
