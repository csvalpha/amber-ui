import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/articles/show';

let model;
const modelName = 'article';

moduleForAcceptance('Acceptance | articles/show', {
  beforeEach() {
    model = server.create(modelName);
  }
});

test('it loads the route when not logged in', (assert) => {
  whenNotLoggedIn();
  itShouldLoadRouteName(assert, {
    page,
    routeParams: { id: model.id },
    finalRouteName: 'articles.show'
  });
});

test('it shows a 404 when article does not exist', (assert) => {
  whenLoggedIn();
  const id = model.id + 1;
  itShouldLoadNotFound(assert, {
    page,
    routeParams: { id }
  });
});

test('it loads the route when logged in', (assert) => {
  whenLoggedIn();
  itShouldLoadRouteName(assert, {
    page,
    routeParams: { id: model.id },
    finalRouteName: 'articles.show'
  });
});
