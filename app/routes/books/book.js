import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class BookRoute extends ApplicationRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.title };
  }

  model(params) {
    return this.store.findRecord('book', params.id, params);
  }
}
