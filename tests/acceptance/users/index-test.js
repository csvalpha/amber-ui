import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/users/index';

const modelName = 'user';
const permissions = ['user.read'];

moduleForAcceptance('Acceptance | users/index', {
  beforeEach() {
    server.createList(modelName, 3);
  }
});

test('it redirects to login when not logged in', (assert) => {
  whenNotLoggedIn();
  itShouldRedirectToLogin(assert, {
    page
  });
});

test('it shows a 404 when without permission', (assert) => {
  whenLoggedIn();
  itShouldLoadNotFound(assert, {
    page
  });
});

test('it loads the route when logged in with permissions', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  itShouldLoadRouteName(assert, {
    page,
    finalRouteName: 'users.index'
  });
});

test('it lists the users', (assert) => {
  whenLoggedInAndWithPermissions(permissions);

  page.visit();
  andThen(() => {
    // 4 instead of 3 because of current user
    assert.equal(page.amountOfUsers, 4);
  });
});
