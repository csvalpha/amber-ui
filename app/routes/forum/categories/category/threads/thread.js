import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ThreadRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller.model.title };
  }

  canAccess() {
    return this.abilities.can('show forum/threads');
  }

  model(params) {
    return this.store.findRecord('forum/thread', params.thread_id, params);
  }
}
