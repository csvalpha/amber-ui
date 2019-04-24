import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/groups/edit';

const modelName = 'group';
const apiPath = '/groups';
let model, values;
const permissions = ['group.read', 'group.update'];

moduleForAcceptance('Acceptance | groups/edit', {
  beforeEach() {
    model = server.create(modelName);
    values = server.build(modelName);
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
    finalRouteName: 'groups.edit'
  });
});

test('it updates a group', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  delete values.activatedAt;
  delete values.descriptionCamofied;
  itShouldUpdateAModel(assert, {
    page,
    model,
    values,
    finalRouteName: 'groups.show'
  });
});

test('it leaves the group unchanged when without input changes', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  itShouldNotUpdateAModel(assert, {
    page,
    model,
    values: model,
    finalRouteName: 'groups.show'
  });
});

test('it leaves the group unchanged when with validation errors from the backend', (assert) => {
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
