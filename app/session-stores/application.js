// See https://github.com/simplabs/ember-simple-auth#fastboot
import CookieStore from 'ember-simple-auth/session-stores/cookie';

export default CookieStore.extend({
  cookieExpirationTime: (90 * 24 * 60 * 60)
});
