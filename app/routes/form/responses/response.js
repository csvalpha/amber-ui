import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ResponseRoute extends AuthenticatedRoute {
  queryParams = {};

  canAccess() {
    return this.abilities.can('show form/responses');
  }

  model(params) {
    return this.store.findRecord('form/response', params.id, params);
  }
}
