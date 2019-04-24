import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/users/new';

const modelName = 'user';
const apiPath = '/users';
let values;
const permissions = ['user.read', 'user.create'];

moduleForAcceptance('Acceptance | users/new', {
  beforeEach() {
    values = server.build(modelName);
    delete values.createdAt;
    delete values.updatedAt;
    delete values.userDetailsSharingPreference;
    delete values.picturePublicationPreference;
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
    finalRouteName: 'users.new'
  });
});

test('it creates a user', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  delete values.activatedAt;
  delete values.infoInAlmanak;
  delete values.ifesDataSharingPreference;
  itShouldCreateAModel(assert, {
    page,
    modelName,
    values,
    finalRouteName: 'users.show'
  });
});

test('it does not create a user when with validation errors from the backend', (assert) => {
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
