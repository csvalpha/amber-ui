// See https://github.com/simplabs/ember-simple-auth#fastboot
import CookieStore from 'ember-simple-auth/session-stores/cookie';

export default class Application extends CookieStore {
  cookieExpirationTime = 90 * 24 * 60 * 60;
}
