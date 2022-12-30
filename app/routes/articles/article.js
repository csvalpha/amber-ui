import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class ArticleRoute extends ApplicationRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.title };
  }

  model(params) {
    return this.store.findRecord('article', params.id, params);
  }
}
