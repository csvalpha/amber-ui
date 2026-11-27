import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DeclarationRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.description };
  }

  canAccess() {
    return this.abilities.can('show declarations');
  }

  model(params) {
    return this.store.findRecord('declaration', params.id, {
      include: 'transactions,transactions.collection',
      reload: true,
    });
  }
}
