import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class EditTopicRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Topic aanpassen' }

  canAccess() {
    return this.can.can('edit forum/threads');
  }

  model() {
    const thread = this.modelFor('forum.categories.category.threads.thread');
    return { thread };
  }

  deactivate() {
    super.deactivate();
    this.controller.model.thread?.rollbackAttributes();
  }
}
