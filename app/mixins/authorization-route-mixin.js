import Error from '@ember/error';
import Mixin from '@ember/object/mixin';
import { resolve, reject } from 'rsvp';

export default Mixin.create({
  /**
   * In some cases, access checking in #beforeModel is not sufficient.
   * Overriding #beforeModel is not a feasible options, because this also overrides other beforeModel hooks higher up
   * in the dependency tree. Using this flag, the access check in the #beforeModel hook can be disabled.
   */
  skipBeforeModelAccessCheck: false,
  canAccess() {
    return false;
  },
  beforeModel(transition) {
    return this.checkAccessWithPromise(this.get('skipBeforeModelAccessCheck') || this.canAccess(), transition);
  },
  /**
   * In some cases, we need to check access based on a promise. This method takes either a boolean
   * or a promise resolving to a boolean, and based on the outcome rejects with #onAccessDenied or resolves to true.
   */
  checkAccessWithPromise(accessCheckResult, transition) {
    return resolve(accessCheckResult).then(canAccess => {
      return canAccess || reject(this.onAccessDenied(transition));
    }).catch(() => {
      this.onAccessDenied(transition);
    });
  },
  onAccessDenied(transition) {
    const error = new Error(`Access denied for route ${transition.targetName} with params ${JSON.stringify(transition.params)}`);
    error.isAuthorizationMixinError = true;
    throw error;
  }
});
