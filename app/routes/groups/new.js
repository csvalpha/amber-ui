import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class NewGroupRoute extends AuthenticatedRoute {
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
