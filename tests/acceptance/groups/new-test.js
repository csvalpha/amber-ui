import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/groups/new';

const modelName = 'group';
const apiPath = '/groups';
let values;
const permissions = ['group.read', 'group.create'];

moduleForAcceptance('Acceptance | groups/new', {
  beforeEach() {
    values = server.build(modelName);
  }
});

test('it redirects to login when not logged in', (assert) => {
  whenNotLoggedIn();
  itShouldRedirectToLogin(assert, { page });
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
    finalRouteName: 'groups.new'
  });
});

test('it creates a group', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  delete values.activatedAt;
  delete values.descriptionCamofied;
  itShouldCreateAModel(assert, {
    page,
    modelName,
    values,
    finalRouteName: 'groups.show'
  });
});

test('it does not create a group when with validation errors from the backend', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  whenWithValidationErrors({
    apiPath,
    values
  });
  itShouldNotCreateAModel(assert, {
    page,
    modelName,
    values
  });
});
