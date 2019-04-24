import { registerAsyncHelper } from '@ember/test';

/**
 * @public
 * Simple helper which validates that when a path is vistited, the user is redirected to the login page.
 */
export default registerAsyncHelper('itShouldRedirectToLogin', (app, assert, { page, routeParams = {} }) => {
  itShouldLoadRouteName(assert, {
    page,
    routeParams,
    finalRouteName: 'login'
  });
});
