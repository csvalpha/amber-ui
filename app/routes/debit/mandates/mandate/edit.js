import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MandateEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Mandaat aanpassen' };

  canAccess() {
    return this.abilities.can('edit debit/mandates');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
