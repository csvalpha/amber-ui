import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import { computed } from '@ember/object';
import { warn } from '@ember/debug';
import { Promise } from 'rsvp';
import Session from 'ember-simple-auth/services/session';
import ENV from 'alpha-amber/config/environment';

export default Session.extend({
  ajax: service(),
  store: service(),
  i18n: service(),
  localStorage: service(),

  raven: computed(() => {
    if (ENV.EMBER_ENV === 'production') {
      service('raven');
    }
  }),

  currentUser: null,
  loadCurrentUser() {
    return new Promise(resolve => {
      if (this.isAuthenticated) {
        this.i18n.set('locale', 'nl');
        this.localStorage.setItem('locale', 'nl');
        this.ajax.request('/users?filter[me]').then(content => {
          this.store.pushPayload(content);
          const user = this.store.peekRecord('user', content.data[0].id);
          user.get('permissions').then(permissions => { // eslint-disable-line no-unused-vars
            resolve(user);
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

      if (ENV.EMBER_ENV === 'production') {
        this.raven.callRaven('setUserContext', {
          id: user.get('id')
        });
      }
    });
  },

  hasPermission(permissionName) {
    const currentUser = this.currentUser;
    const hasPermission = !isNone(currentUser) && currentUser.hasPermission(permissionName);
    warn(
      `Current user does not have permission '${permissionName}'`,
      !ENV.APP.LOG_ACCESS_CONTROL || hasPermission,
      { id: 'alpha-amber.session.no-permission' }
    );
    return hasPermission;
  }
});
