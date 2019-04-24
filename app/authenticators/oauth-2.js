import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from '../config/environment';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${ENV.api.hostname}/oauth/token`,
  serverTokenRevocationEndpoint: `${ENV.api.hostname}/oauth/revoke`,
  rejectWithResponse: true
});
