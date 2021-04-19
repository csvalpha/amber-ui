import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from '../config/environment';

export default class OAuth2Authenticator extends OAuth2PasswordGrant {
  serverTokenEndpoint = `${ENV.api.hostname}/oauth/token`
  serverTokenRevocationEndpoint =`${ENV.api.hostname}/oauth/revoke`
  rejectWithResponse = true
  sendClientIdAsQueryParam = true
}
