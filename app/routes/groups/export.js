import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ExportGroupRoute extends AuthenticatedRoute {
  get breadcrumb() {
    return { title: `${this.controller.model.name} exporteren` };
  }

  canAccess(model) {
    return this.abilities.can('export group', model);
  }

  model(params) {
    return this.store.findRecord('group', params.id, params);
  }
}
