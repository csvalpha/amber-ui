import { registerAsyncHelper } from '@ember/test';

/**
 * @public
 * Simple helper which validates that when a path is vistited, the user is redirected to the given path.
 */
export default registerAsyncHelper('itShouldLoadRouteName', (app, assert, { page, finalRouteName, routeParams = {} }) => {
  assert.expect(assert.test.expected + 2);

  page.visit(routeParams);

  andThen(() => {
    const path = currentRouteName();
    assert.notOk(path === undefined, 'The user should be redirected. Instead, no route was loaded. This is probably caused by missing permissions');
    assert.equal(path, finalRouteName, `The user should be redirected to ${finalRouteName}`);
  });
});
