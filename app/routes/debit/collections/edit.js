import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class EditCollectionRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Incasso aanpassen' }

  canAccess() {
    return this.can.can('edit debit/collections');
  }

  model(params) {
    return this.store.findRecord('debit/collections', params.id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
