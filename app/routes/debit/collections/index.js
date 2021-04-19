import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class CollectionsIndexRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Incasso\'s' }

  get pageActions() {
    return [
      {
        link: 'debit.collections.new',
        title: 'Nieuwe incasso',
        icon: 'plus',
        canAccess: this.can.can('create debit/collections')
      }
    ];
  }

  canAccess() {
    return this.can.can('show debit/collections');
  }

  model(params) {
    return this.store.queryPaged('debit/collection', params);
  }
}
