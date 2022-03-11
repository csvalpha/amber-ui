import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class EditCollectionRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Incasso aanpassen' };

  canAccess() {
    return this.abilities.can('edit debit/collections');
  }

  model(params) {
    return this.store.findRecord('debit/collection', params.id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
