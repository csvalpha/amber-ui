import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/users/edit';

const modelName = 'user';
const apiPath = '/users';
let model, values;
const permissions = ['user.read', 'user.update'];

moduleForAcceptance('Acceptance | users/edit', {
  beforeEach() {
    model = server.create(modelName);
    values = server.build(modelName);
    delete values.createdAt;
    delete values.updatedAt;
    delete values.infoInAlmanak;
    delete values.ifesDataSharingPreference;
    delete values.userDetailsSharingPreference;
    delete values.picturePublicationPreference;
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
    finalRouteName: 'users.edit'
  });
});

test('it updates a user', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  delete values.activatedAt;
  itShouldUpdateAModel(assert, {
    page,
    model,
    values,
    finalRouteName: 'users.show'
  });
});

test('it leaves the user unchanged when without input changes', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  itShouldNotUpdateAModel(assert, {
    page,
    model,
    values: model,
    finalRouteName: 'users.show'
  });
});

test('it leaves the user unchanged when with validation errors from the backend', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  whenWithValidationErrors({
    method: 'patch',
    apiPath: `${apiPath}/${model.id}`,
    values
  });
  itShouldNotUpdateAModel(assert, {
    page,
    model,
    values
  });
});
