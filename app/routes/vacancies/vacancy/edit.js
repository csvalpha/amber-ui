import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class VacancyEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Vacature aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit vacancy', model);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
