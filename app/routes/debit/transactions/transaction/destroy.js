import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class TransactionDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Transactie verwijderen' };

  canAccess() {
    return this.abilities.can('destroy debit/transactions');
  }
}
