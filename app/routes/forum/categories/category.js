import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class CategoryRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadCrumb() {
    return { title: this.controller.model.name };
  }

  canAccess() {
    return this.abilities.can('show forum/categories');
  }

  model(params) {
    return this.store.findRecord('forum/category', params.category_id, params);
  }
}
