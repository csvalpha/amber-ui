import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class NewTopicRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Topic aanmaken' };

  canAccess() {
    return this.abilities.can('create forum/thread');
  }

  async model() {
    const category = this.modelFor('forum.categories.category');
    const thread = await this.store.createRecord('forum/thread', { category });
    const post = await this.store.createRecord('forum/post', { thread });
    post.reload(); // hoping this updates thread.posts?
    return thread;
  }

  deactivate() {
    super.deactivate();
    this.controller.model.rollbackAttributesAndPosts();
  }
}
