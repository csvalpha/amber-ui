import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyCategoryRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Categorie verwijderen' };

  canAccess() {
    return this.abilities.can('destroy forum/categories');
  }

  model() {
    return this.modelFor('forum.categories.category');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
