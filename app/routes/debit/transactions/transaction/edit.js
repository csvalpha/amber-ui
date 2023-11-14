import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class TransactionEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Transactie aanpassen' };

  canAccess() {
    return this.abilities.can('edit debit/transactions');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
