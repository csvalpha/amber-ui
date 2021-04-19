import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class EditCategoryRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Categorie aanpassen' }

  canAccess() {
    return this.can.can('edit forum/categories');
  }

  model() {
    return this.modelFor('forum.categories.category');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
