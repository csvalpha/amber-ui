import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from '../config/environment';
import { makeArray } from '@ember/array';
import { run } from '@ember/runloop';
import { isEmpty } from '@ember/utils';
import RSVP from 'rsvp';
import { assign } from '@ember/polyfills';

export default class OAuth2Authenticator extends OAuth2PasswordGrant {
  serverTokenEndpoint = `${ENV.api.hostname}/oauth/token`
  serverTokenRevocationEndpoint =`${ENV.api.hostname}/oauth/revoke`
  clientId = ENV.clientId

  // Reimplementation of default oauth2 authentication, but with additional params
  authenticate(identification, password, scope = {}, headers = [], params = {}) {
    return new RSVP.Promise((resolve, reject) => {
      const data = { 'grant_type': 'password', username: identification, password };
      assign(data, params);
      const { serverTokenEndpoint } = this;

      const scopesString = makeArray(scope).join(' ');
      console.log(scope);
      if (!isEmpty(scopesString)) {
        data.scope = scopesString;
      }

      this.makeRequest(serverTokenEndpoint, data, headers).then((response) => {
        run(() => {
          if (!this._validate(response)) {
            reject('access_token is missing in server response');
          }

          const expiresAt = this._absolutizeExpirationTime(response.expires_in);
          this._scheduleAccessTokenRefresh(response.expires_in, expiresAt, response.refresh_token);
          if (!isEmpty(expiresAt)) {
            response = assign(response, { 'expires_at': expiresAt });
          }

          resolve(response);
        });
      }, (response) => {
        run(null, reject, response);
      });
    });
  }
}
