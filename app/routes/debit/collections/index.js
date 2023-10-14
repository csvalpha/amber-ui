import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class CollectionsIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    return [
      {
        link: 'debit.collections.new',
        title: 'Nieuwe incasso',
        icon: 'plus',
        canAccess: this.abilities.can('create debit/collections'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show debit/collections');
  }

  model(params) {
    return this.store.queryPaged('debit/collection', params);
  }
}
