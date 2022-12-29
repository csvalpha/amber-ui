import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class CollectionRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.name };
  }

  canAccess() {
    return this.abilities.can('show debit/collections');
  }

  model(params) {
    return this.store.findRecord('debit/collection', params.id, params);
  }
}
