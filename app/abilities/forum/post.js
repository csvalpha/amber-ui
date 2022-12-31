import { Ability } from 'ember-can';
import { isNone } from '@ember/utils';
import moment from 'moment';

export default class Post extends Ability {
  get canShow() {
    return this.session.hasPermission('forum/post.read');
  }

  get canDestroy() {
    return this.session.hasPermission('forum/post.destroy');
  }

  get canEdit() {
    if (this.isThreadClosed(this.model.thread)) {
      // Permission to both update post and thread
      return (
        this.session.hasPermission('forum/post.update') &&
        this.session.hasPermission('forum/thread.update')
      );
    }

    // Permission to update or owner of post
    return (
      this.session.hasPermission('forum/post.update') ||
      this.isPostOwner(this.model)
    );
  }

  isThreadClosed(thread) {
    return moment().isAfter(thread.get('closedAt'));
  }

  isPostOwner(post) {
    const { currentUser } = this.session;
    return (
      !isNone(currentUser) && post.get('author.id') === currentUser.get('id')
    );
  }
}
