import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import component from 'alpha-amber/tests/pages/components/user-comment';
import { create } from 'ember-cli-page-object';
import startMirage from '../../helpers/setup-mirage-for-integration';

let userCommentComponent;

moduleForComponent('user-comment', 'Integration | Component | user-comment', {
  integration: true,
  beforeEach() {
    startMirage(this.container);
    userCommentComponent = create(component);
    userCommentComponent.setContext(this);
  },
  afterEach() {
    userCommentComponent.removeContext();
    window.server.shutdown();
  }
});

test('it display the comment', function(assert) {
  const comment = EmberObject.create(server.create('photo-comment').attrs, { author: { fullName: 'Foo Bar' } });
  this.set('comment', comment);

  userCommentComponent.render(hbs`{{user-comment comment}}`);

  assert.equal(userCommentComponent.author, 'Foo Bar');
  assert.equal(userCommentComponent.content, comment.content);
});
