import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class GroupEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Groep aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit group', model);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributesAndMemberships();
  }
}
