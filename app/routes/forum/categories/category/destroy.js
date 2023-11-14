import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class CategoryDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Categorie verwijderen' };

  canAccess() {
    return this.abilities.can('destroy forum/categories');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
