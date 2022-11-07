import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class ActivityRoute extends ApplicationRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.title };
  }

  model(params) {
    return this.store.findRecord('activity', params.id, params);
  }
}
