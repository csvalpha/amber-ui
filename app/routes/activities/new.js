import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class NewActivityRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Activiteit aanmaken' };

  canAccess() {
    return this.abilities.can('create activities');
  }

  model() {
    return this.store.createRecord('activity');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributesAndForm();
  }
}
