import { module, test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/index';

moduleForAcceptance('Acceptance | index',
  {},
  () => {
    test('it loads the route', (assert) => {
      itShouldLoadRouteName(assert, {
        page,
        finalRouteName: 'index'
      });
    });

    test('it shows the advertisements when not logged in ', (assert) => {
      whenNotLoggedIn();
      page.visit();
      andThen(() => {
        assert.ok(page.advertisementsAreVisible);
      });
    });

    module('when not logged in',
      { beforeEach: () => {
        whenNotLoggedIn();
        server.createList('article', 3);
        server.createList('photo-album', 4);
        server.createList('activity', 5);
      }
      },
      () => {
        test('it shows articles', (assert) => {
          page.visit();
          andThen(() => {
            assert.equal(page.amountOfArticles, 3);
          });
        });

        test('it shows photoalbums', (assert) => {
          whenNotLoggedIn();
          page.visit();
          andThen(() => {
            assert.equal(page.amountOfPhotoAlbums, 4);
          });
        });

        test('it shows activities', (assert) => {
          whenNotLoggedIn();

          page.visit();
          andThen(() => {
            assert.equal(page.amountOfActivities, 5);
          });
        });
      }
    );

    module('when logged in',
      { beforeEach: () => whenLoggedIn() },
      () => {
        test('it shows the advertisements', (assert) => {
          page.visit();
          andThen(() => {
            assert.ok(page.advertisementsAreVisible);
          });
        });
        module('when with permission',
          { beforeEach: () => whenWithPermissions(['article.read']) },
          () => {
            test('it shows the advertisements when without articles', (assert) => {
              page.visit();
              andThen(() => {
                assert.ok(page.advertisementsAreVisible);
              });
            });

            module('when with articles',
              { beforeEach: () => server.createList('article', 3) },
              () => {
                test('when with articles', (assert) => {
                  page.visit();
                  andThen(() => {
                    assert.ok(page.advertisementsAreVisible);
                  });
                });
              }
            );
          }
        );
      }
    );
  }
);
