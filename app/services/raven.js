import { get } from '@ember/object';
import { isNone } from '@ember/utils';
import RavenService from 'ember-cli-deploy-sentry/services/raven';

export default RavenService.extend({
  ignoreError(error) {
    if (!isNone(error)) {
      if (error.isAdapterError) {
        const status = get(error, 'errors.firstObject.status');
        return ['401', '404'].includes(String(status));
      }

      if (error.isAuthorizationMixinError) {
        // This is an error caused by the authorization route mixin denying access to a user (not when a 403 is returned)
        return true;
      }
    }

    return false;
  }
});
