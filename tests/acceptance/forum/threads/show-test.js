import { module, test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/forum/threads/show';

let model, routeParams;
const modelName = 'forum-thread';
const permissions = ['forum/category.read', 'forum/thread.read', 'forum/post.read'];

moduleForAcceptance('Acceptance | forum/threads/show',
  {
    beforeEach: () => {
      model = server.create(modelName, 'withCategory', 'withPosts');
      // eslint-disable-next-line camelcase
      routeParams = { category_id: model.category.id, thread_id: model.id };
    }
  },
  () => {
    module('when logged in',
      { beforeEach: () => whenLoggedIn() },
      () => {
        test('it shows a 404', assert => {
          itShouldLoadNotFound(assert, { page, routeParams });
        });

        module('when with permission',
          { beforeEach: () => whenWithPermissions(permissions) },
          () => {
            test('it shows a 404 when thread does not exist', assert => {
              const id = model.id + 1;
              // eslint-disable-next-line camelcase
              itShouldLoadNotFound(assert, { page, routeParams: { category_id: model.category.id, thread_id: id } });
            });

            test('it shows the posts in the thread', assert => {
              page.visit(routeParams);

              andThen(() => {
                assert.equal(currentRouteName(), 'forum.categories.category.threads.thread.posts.index');
                assert.ok(page.forumPosts().count > 0);
                assert.equal(page.forumPosts().count, model.amountOfPosts);
              });
            });

            test('it allows not to submit a post', assert => {
              page.visit(routeParams);

              andThen(() => {
                assert.notOk(page.forumPostNew.isVisible);
              });
            });

            module('when with forum post create permission',
              { beforeEach: () => whenWithPermissions(['forum/post.create']) },
              () => {
                test('it allows to submit a post', assert => {
                  page.visit(routeParams);

                  andThen(() => {
                    assert.ok(page.forumPostNew.isVisible);
                    // TODO assert that it is possible to create a post
                  });
                });
              }
            );
          }
        );
      }
    );
  },
  () => {
    test('it allows to submit a post in an empty thread', assert => {
      model = server.create(modelName, 'withCategory');
      // eslint-disable-next-line camelcase
      page.visit({ category_id: model.category.id, thread_id: model.id });

      andThen(() => {
        assert.equal(page.forumPosts().count, 0);
        assert.equal(model.amountOfPosts, 0);
        assert.ok(page.forumPostNew.isVisible, 'new forum post component is visible');
      });
    });
  }
);
