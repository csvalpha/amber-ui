import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class NewCategoryRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Categorie aanmaken' };

  canAccess() {
    return this.abilities.can('create forum/categories');
  }

  model() {
    return this.store.createRecord('forum/category');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
