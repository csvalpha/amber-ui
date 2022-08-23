import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class NewCollectionRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Incasso aanmaken' };

  canAccess() {
    return this.abilities.can('create debit/collections');
  }

  model() {
    return this.store.createRecord('debit/collection');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
