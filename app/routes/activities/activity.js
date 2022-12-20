import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ActivityRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.title };
  }

  canAccess() {
    return this.abilities.can('show activities');
  }

  model(params) {
    return this.store.findRecord('activity', params.id, params);
  }
}
