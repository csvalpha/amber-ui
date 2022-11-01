import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class NewMandateRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Mandaat aanmaken' };

  canAccess() {
    return this.abilities.can('create debit/mandates');
  }

  model() {
    return this.store.createRecord('debit/mandate');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
