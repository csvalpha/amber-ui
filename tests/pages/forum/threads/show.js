import {
  create,
  collection,
  visitable
} from 'ember-cli-page-object';
import forumPostNew from 'alpha-amber/tests/pages/components/forum/forum-post-new';
import testSelector from 'ember-test-selectors';

export default create({
  visit: visitable('/forum/categories/:category_id/threads/:thread_id'),
  forumPosts: collection({
    itemScope: testSelector('forum-post'),
    item: {}
  }),
  forumPostNew
});
