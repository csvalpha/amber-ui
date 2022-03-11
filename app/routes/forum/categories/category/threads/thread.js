import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class ThreadRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadCrumb() {
    return { title: this.controller.model.title };
  }

  canAccess() {
    return this.abilities.can('show forum/threads');
  }

  model(params) {
    return this.store.findRecord('forum/thread', params.thread_id, params);
  }
}
