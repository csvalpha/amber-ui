import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyTransactionRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Transactie verwijderen' }

  canAccess() {
    return this.can.can('destroy debit/transactions');
  }

  model(params) {
    return this.store.findRecord('debit/transaction', params.id, params);
  }
}
