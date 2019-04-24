import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/users/destroy';

const modelName = 'user';
const permissions = ['user.destroy'];
let model;

moduleForAcceptance('Acceptance | users/destroy', {
  beforeEach() {
    model = server.create(modelName);
  }
});

test('it redirects to login when not logged in', (assert) => {
  whenNotLoggedIn();
  itShouldRedirectToLogin(assert, {
    page,
    routeParams: { id: model.id }
  });
});

test('it shows a 404 when without permission', (assert) => {
  whenLoggedIn();
  itShouldLoadNotFound(assert, {
    page,
    routeParams: { id: model.id }
  });
});

test('it shows a 404 when user does not exist', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  const id = model.id + 1;
  itShouldLoadNotFound(assert, {
    page,
    routeParams: { id }
  });
});

test('it loads the route when logged in with permissions', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  itShouldLoadRouteName(assert, {
    page,
    routeParams: { id: model.id },
    finalRouteName: 'users.destroy'
  });
});
