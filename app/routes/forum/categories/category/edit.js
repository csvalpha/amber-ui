import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class EditCategoryRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Categorie aanpassen' };

  canAccess() {
    return this.abilities.can('edit forum/categories');
  }

  model() {
    return this.modelFor('forum.categories.category');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
