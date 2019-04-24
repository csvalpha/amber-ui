/* eslint camelcase: "off" */
import { registerAsyncHelper } from '@ember/test';
import {
  authenticateSession,
  currentSession
} from 'alpha-amber/tests/helpers/ember-simple-auth';

/**
 * @public
 * Simple helper which makes sure that the user is authenticated.
 *
 * @param app The current application, always given by default.
 */
export default registerAsyncHelper('whenLoggedIn', (app) => {
  authenticateSession(app, {
    access_token: 'e9eea4d996f1b22d7a770f4ee9651e3a2d3d84b232c22a9f6705ab24633b478c',
    created_at: 123456789,
    expires_in: 7200,
    token_type: 'bearer'
  });

  andThen(() => {
    currentSession(app).loadAndSetCurrentUser();
  });
});
