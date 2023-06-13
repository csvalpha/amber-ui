import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class GroupsNewRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Groep aanmaken' };

  canAccess() {
    return this.abilities.can('create groups');
  }

  model() {
    return this.store.createRecord('group');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributesAndMemberships();
  }
}
