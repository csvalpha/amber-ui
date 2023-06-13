import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class TransactionRoute extends AuthenticatedRoute {
  queryParams = {};

  canAccess() {
    return this.abilities.can('show debit/transactions');
  }

  model(params) {
    return this.store.findRecord('debit/transaction', params.id, params);
  }
}
