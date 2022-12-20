import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class ArticleRoute extends ApplicationRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.title };
  }

  canAccess() {
    return this.abilities.can('show articles');
  }

  model(params) {
    return this.store.findRecord('article', params.id, params);
  }
}
