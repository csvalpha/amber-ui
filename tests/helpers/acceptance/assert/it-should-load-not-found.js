import Ember from 'ember';
import testSelector from 'ember-test-selectors';
import { registerAsyncHelper } from '@ember/test';

const { Logger, Test } = Ember;

/**
 * @public
 * Simple helper which validates that when a path is vistited, the user is redirected to the given path.
 */
export default registerAsyncHelper('itShouldLoadNotFound', (app, assert, { page, routeParams = {} }) => {
  assert.expect(assert.test.expected + 2);

  // Monkey patch to make sure test does not fail because of thrown error
  // Based on https://williamsbdev.com/posts/testing-rsvp-errors-handled-globally/
  const originalExceptionFunction = Test.adapter.exception;
  const originalLoggerError = Logger.error;
  Test.adapter.exception = function() {};
  Logger.error = function() {};
  page.visit(routeParams);

  andThen(() => {
    const path = currentRouteName();
    assert.equal(path, 'error', 'The user should be redirected to error');
    assert.equal(find(testSelector('error-message')).text().trim(), 'Deze pagina bestaat niet (meer).');
    Test.adapter.exception = originalExceptionFunction;
    Logger.error = originalLoggerError;
  });
});
