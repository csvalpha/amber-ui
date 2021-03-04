import Service, { inject as service } from '@ember/service';
import ENV from '../config/environment';
import { fetch as basefetch } from 'fetch';

export default class FetchService extends Service {
  @service session;

  fetch(url, args = {}) {
    url = ENV.api.hostname + url;

    if (!args.headers) {
      args.headers = {};
    }

    args.headers.Authorization = this.authorizationHeader();

    return basefetch(url, args);
  }

  post(url, args  = {}) {
    args.method = 'POST';
    this._parseBody(args);
    this._setHeaders(args);
    return this.fetch(url, args);
  }

  patch(url, args = {}) {
    args.method = 'PATCH';
    this._parseBody(args);
    this._setHeaders(args);
    return this.fetch(url, args);
  }

  _parseBody(args) {
    if (args.body) {
      args.body = JSON.stringify(args.body);
    }
  }

  _setHeaders(args) {
    if (!args.headers) {
      args.headers = {};
    }

    args.headers.Accept = 'application/vnd.api+json';
    args.headers['Content-Type'] = 'application/vnd.api+json';
  }

  authorizationHeader() {
    const accessToken = this.session.data.authenticated.access_token;
    if (accessToken) {
      return `Bearer ${accessToken}`;
    }
  }
}
