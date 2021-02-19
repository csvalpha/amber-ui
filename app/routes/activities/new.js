import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewActivityRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Activiteit aanmaken' }

  canAccess() {
    return this.can.can('create activities');
  }

  model() {
    return this.store.createRecord('activity');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributesAndForm();
  }

}
