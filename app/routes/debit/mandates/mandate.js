import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MandateRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.id };
  }

  canAccess() {
    return this.abilities.can('show debit/mandates');
  }

  model(params) {
    return this.store.findRecord('debit/mandate', params.id, params);
  }
}
