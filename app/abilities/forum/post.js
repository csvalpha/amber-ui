import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canEdit: computed('session.currentUser', 'model.author.id', 'model.thread.closedAt', function() {
    if (this.isThreadClosed(this.get('model.thread'))) {
      // Permission to both update post and thread
      return this.get('session').hasPermission('forum/post.update') && this.get('session').hasPermission('forum/thread.update');
    }
    // Permission to update or owner of post
    return this.get('session').hasPermission('forum/post.update') || this.isPostOwner(this.get('model'));
  }),
  isThreadClosed(thread) {
    return moment().isAfter(thread.get('closedAt'));
  },
  isPostOwner(post) {
    const currentUser = this.get('session.currentUser');
    return !isNone(currentUser) && (post.get('author.id') === currentUser.get('id'));
  }
});
