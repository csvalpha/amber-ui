import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/articles/edit';

const modelName = 'article';
const apiPath = '/articles';
const permissions = ['article.update'];
let model, values;

moduleForAcceptance('Acceptance | articles/edit', {
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

test('it shows a 404 when article does not exist', (assert) => {
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
    finalRouteName: 'articles.edit'
  });
});

test('it updates an article', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  delete values.excerpt;
  delete values.contentCamofied;
  itShouldUpdateAModel(assert, {
    page,
    model,
    values,
    finalRouteName: 'articles.show'
  });
});

test('it leaves the article unchanged when without input changes', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  itShouldNotUpdateAModel(assert, {
    page,
    model,
    values: model,
    finalRouteName: 'articles.show'
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
