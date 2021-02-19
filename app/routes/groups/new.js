import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewGroupRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Groep aanmaken' }

  canAccess() {
    return this.can.can('create groups');
  }

  model() {
    return this.store.createRecord('group');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributesAndMemberships();
  }

}

