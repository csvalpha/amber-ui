import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewCategoryRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Categorie aanmaken' }

  canAccess() {
    return this.can.can('create forum/categories');
  }

  model() {
    return this.store.createRecord('forum/category');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }

}

