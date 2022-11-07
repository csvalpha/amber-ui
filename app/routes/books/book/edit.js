import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class BookEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Boek aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit book', model);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
