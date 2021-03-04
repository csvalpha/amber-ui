import { Ability } from 'ember-can';

export default class Thread extends Ability {
  get canCreate() {
    return this.session.hasPermission('forum/thread.create');
  }

  get canShow() {
    return this.session.hasPermission('forum/thread.read');
  }

  get canEdit() {
    return this.session.hasPermission('forum/thread.update');
  }

  get canDestroy() {
    return this.session.hasPermission('forum/thread.destroy');
  }

  get canCreatePost() {
    return (this.model.get('isOpen') || this.session.hasPermission('forum/thread.update'))
      && this.session.hasPermission('forum/post.create');
  }

  get canQuotePost() {
    return this.canCreatePost;
  }
}
