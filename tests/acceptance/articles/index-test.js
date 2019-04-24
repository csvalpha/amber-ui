import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/articles/index';

const modelName = 'article';

moduleForAcceptance('Acceptance | articles/index', {
  beforeEach() {
    server.createList(modelName, 3);
  }
});

test('it loads the route when when not logged in', (assert) => {
  whenNotLoggedIn();
  itShouldLoadRouteName(assert, {
    page,
    finalRouteName: 'articles.index'
  });
});

test('it lists the articles', (assert) => {
  whenLoggedIn();

  page.visit();
  andThen(() => {
    assert.equal(page.amountOfArticles, 3);
  });
});
