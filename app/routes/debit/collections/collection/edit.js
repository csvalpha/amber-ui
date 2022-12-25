import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class CollectionEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Incasso aanpassen' };

  canAccess() {
    return this.abilities.can('edit debit/collections');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
