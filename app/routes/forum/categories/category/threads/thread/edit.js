import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class EditTopicRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Topic aanpassen' };

  canAccess() {
    return this.abilities.can('edit forum/threads');
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
