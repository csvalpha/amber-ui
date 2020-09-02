import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShow: computed('session.currentUser', function() {
    return this.session.hasPermission('forum/post.read');
  }),
  canDestroy: computed('session.currentUser', function() {
    return this.session.hasPermission('forum/post.destroy');
  }),
  canEdit: computed('session.currentUser', 'model.author.id', 'model.thread.closedAt', function() {
    if (this.isThreadClosed(this.model.thread)) {
      // Permission to both update post and thread
      return this.session.hasPermission('forum/post.update') && this.session.hasPermission('forum/thread.update');
    }

    // Permission to update or owner of post
    return this.session.hasPermission('forum/post.update') || this.isPostOwner(this.model);
  }),
  isThreadClosed(thread) {
    return moment().isAfter(thread.get('closedAt'));
  },
  isPostOwner(post) {
    const { currentUser } = this.session;
    return !isNone(currentUser) && (post.get('author.id') === currentUser.get('id'));
  }
});
