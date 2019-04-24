import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/articles/new';

const modelName = 'article';
const apiPath = '/articles';
const permissions = ['article.create'];
let values;

moduleForAcceptance('Acceptance | articles/new', {
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
    finalRouteName: 'articles.new'
  });
});

test('it creates an article', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  delete values.excerpt;
  delete values.contentCamofied;
  itShouldCreateAModel(assert, {
    page,
    modelName,
    values,
    finalRouteName: 'articles.show'
  });
});

test('it does not create an article when with validation errors from the backend', (assert) => {
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
