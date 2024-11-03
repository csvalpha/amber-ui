import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class TransactionsRoute extends AuthenticatedRoute {
  queryParams = {};

  breadcrumb = { title: 'Transacties' };

  canAccess() {
    return this.abilities.can('show debit/transactions');
  }
}
