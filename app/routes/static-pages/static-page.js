import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class StaticPageRoute extends ApplicationRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller.model.title };
  }

  model(params) {
    return this.store.findRecord('static-page', params.id, params);
  }
}
