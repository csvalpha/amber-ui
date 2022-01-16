import { inject as service } from '@ember/service';
import BaseSessionService from 'ember-simple-auth/services/session';
import { tracked } from '@glimmer/tracking';
import { isNone } from '@ember/utils';
import { debug } from '@ember/debug';
import ENV from 'alpha-amber/config/environment';
import * as Sentry from '@sentry/browser';

export default class SessionService extends BaseSessionService {
  @service intl
  @service localStorage
  @service fetch
  @service store
  @tracked currentUser

  async handleAuthentication() {
    super.handleAuthentication(...arguments);

    try {
      await this.loadUser();
    } catch(err) {
      if (err.name !== 'AbortError') {
        await this.invalidate();
      }
    }
  }

  async loadUser() {
    if (this.session.isAuthenticated) {
      // Set the local back to dutch, to prevent mixed languages
      this.intl.set('locale', 'nl');
      this.localStorage.setItem('locale', 'nl');

      // Load user
      let user = await this.store.query('user', { me: true, include: 'user_permissions' });
      await user.firstObject.permissions; // Load the permissions
      this.currentUser = user.firstObject;
      Sentry.setUser({ id: this.currentUser?.id });
    }
  }

  hasPermission(permissionName) {
    const hasPermission = !isNone(this.currentUser) && this.currentUser.hasPermission(permissionName);
    if (!hasPermission) {
      debug(
        `Current user does not have permission '${permissionName}'`,
        !ENV.APP.LOG_ACCESS_CONTROL || hasPermission,
        {id: 'alpha-amber.session.no-permission'}
      );
    }
    return hasPermission;
  }
}
