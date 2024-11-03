import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class UserRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.fullName };
  }

  canAccess() {
    return this.abilities.can('show individual users');
  }

  model(params) {
    return this.store.findRecord('user', params.id, params);
  }
}
