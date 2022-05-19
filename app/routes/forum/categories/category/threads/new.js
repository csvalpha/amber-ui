import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class NewTopicRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Topic aanmaken' };

  canAccess() {
    return this.abilities.can('create forum/thread');
  }

  model() {
    const category = this.modelFor('forum.categories.category');
    const thread = this.store.createRecord('forum/thread', { category });
    const post = this.store.createRecord('forum/post', { thread });

    return { category, thread, post };
  }

  deactivate() {
    super.deactivate();
    this.controller.model.thread?.rollbackAttributes();
    this.controller.model.post?.rollbackAttributes();
  }
}
