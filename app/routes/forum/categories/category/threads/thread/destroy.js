import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyTopicRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Topic verwijderen' }

  canAccess() {
    return this.can.can('destroy forum/threads');
  }

  model() {
    return this.modelFor('forum.categories.category.threads.thread');
  }
}
