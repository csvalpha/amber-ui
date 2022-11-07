import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class GroupRoute extends ApplicationRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.name };
  }

  model(params) {
    return this.store.findRecord('group', params.id, params);
  }
}
