import Service, { inject as service } from '@ember/service';
import ENV from '../config/environment';

import { fetch as basefetch } from 'fetch';

export default Service.extend({
  session: service(),

  fetch(url, args = {}) {
    url = ENV.api.hostname + url;

    if (!args.headers) {
      args.headers = {};
    }

    args.headers.Authorization = this.authorizationHeader();

    return basefetch(url, args);
  },

  post(url, args  = {}) {
    args.method = 'POST';
    return this.fetch(url, args);
  },

  authorizationHeader() {
    const accessToken = this.get('session.data.authenticated.access_token');
    if (accessToken) {
      return `Bearer ${accessToken}`;
    }
  }
});
