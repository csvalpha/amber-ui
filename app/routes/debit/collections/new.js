import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewCollectionRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Incasso aanmaken' }

  canAccess() {
    return this.can.can('create debit/collections');
  }

  model() {
    return this.store.createRecord('debit/collection');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }

}

