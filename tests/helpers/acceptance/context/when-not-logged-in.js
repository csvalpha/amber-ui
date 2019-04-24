import { registerAsyncHelper } from '@ember/test';

/**
 * @public
 * Simple helper to make sure that the user is not authenticated.
 *
 * @param app The current application, always given by default.
 */
export default registerAsyncHelper('whenNotLoggedIn', (/* app */) => {
  // Empty for now, but maybe additional actions are needed here in the future.
});
