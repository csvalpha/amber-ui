import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class EditTransactionRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Transactie aanpassen' }

  canAccess() {
    return this.abilities.can('edit debit/transactions');
  }

  model(params) {
    return this.store.findRecord('debit/transaction', params.id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
