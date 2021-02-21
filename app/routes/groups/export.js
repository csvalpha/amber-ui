import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class ExportGroupRoute extends AuthenticatedRoute {
  get breadCrumb() {
    return { title: `${this.controller.model.name} exporteren` };
  }

  canAccess(model) {
    return this.can.can('export group', model);
  }

  model(params) {
    return this.store.findRecord('group', params.id, params);
  }
}
