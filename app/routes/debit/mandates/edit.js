import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class EditMandateRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Mandaat aanpassen' };

  canAccess() {
    return this.abilities.can('edit debit/mandates');
  }

  model(params) {
    return this.store.findRecord('debit/mandate', params.id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
