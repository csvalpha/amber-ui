import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class GroupExportRoute extends AuthenticatedRoute {
  get breadcrumb() {
    return { title: `${this.controller.model.name} exporteren` };
  }

  canAccess(model) {
    return this.abilities.can('export group', model);
  }
}
