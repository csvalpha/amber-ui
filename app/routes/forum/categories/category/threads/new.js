import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ThreadsNewRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Topic aanmaken' };

  canAccess() {
    return this.abilities.can('create forum/thread');
  }

  async model() {
    const category = this.modelFor('forum.categories.category');
    const thread = await this.store.createRecord('forum/thread', { category });
    await this.store.createRecord('forum/post', { thread });
    // the post created above can magically be accessed via the thread model
    return thread;
  }

  deactivate() {
    super.deactivate();
    this.controller.model.rollbackAttributesAndPosts();
  }
}
