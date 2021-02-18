import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import { debug } from '@ember/debug';
import { Promise } from 'rsvp';
import Session from 'ember-simple-auth/services/session';
import ENV from 'alpha-amber/config/environment';
import * as Sentry from '@sentry/browser';

export default Session.extend({
  fetch: service(),
  store: service(),
  intl: service(),
  localStorage: service(),

  currentUser: null,
  loadCurrentUser() {
    return new Promise(resolve => {
      if (this.isAuthenticated) {
        this.intl.set('locale', 'nl');
        this.localStorage.setItem('locale', 'nl');
        this.fetch.fetch('/users?filter[me]').then(content => {
          if (content.status !== 200) {
            return resolve(null);
          }

          content.json().then(json => {
            this.store.pushPayload(json);
            const user = this.store.peekRecord('user', json.data[0].id);

            user.get('permissions').then(permissions => { // eslint-disable-line no-unused-vars
              resolve(user);
            });
          });
        }).catch(() => {
          resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  },

  loadAndSetCurrentUser() {
    return this.loadCurrentUser().then(user => {
      this.set('currentUser', user);

      if (user === null) {
        return;
      }

      Sentry.setUser({ id: user.id });
    });
  },

  hasPermission(permissionName) {
    const hasPermission = !isNone(this.currentUser) && this.currentUser.hasPermission(permissionName);
    debug(
      `Current user does not have permission '${permissionName}'`,
      !ENV.APP.LOG_ACCESS_CONTROL || hasPermission,
      { id: 'alpha-amber.session.no-permission' }
    );
    return hasPermission;
  }
});
