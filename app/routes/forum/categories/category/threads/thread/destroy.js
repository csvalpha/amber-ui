import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyTopicRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Topic verwijderen' };

  canAccess() {
    return this.abilities.can('destroy forum/threads');
  }

  model() {
    return this.modelFor('forum.categories.category.threads.thread');
  }
}
