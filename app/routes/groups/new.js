import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewGroupRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Groep aanmaken' };

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
