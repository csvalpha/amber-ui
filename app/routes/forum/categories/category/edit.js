import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class CategoryEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Categorie aanpassen' };

  canAccess() {
    return this.abilities.can('edit forum/categories');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
