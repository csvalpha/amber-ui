import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewMandateRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Mandaat aanmaken' }

  canAccess() {
    return this.can.can('create debit/mandates');
  }

  model() {
    return this.store.createRecord('debit/mandate');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
