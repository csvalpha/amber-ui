import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class GroupRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.name };
  }

  canAccess() {
    return this.abilities.can('show groups');
  }

  model(params) {
    return this.store.findRecord('group', params.id, params);
  }
}
