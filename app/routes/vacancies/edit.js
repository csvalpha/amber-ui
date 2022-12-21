import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class EditVacancyRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Vacature aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit vacancy', model);
  }

  model(params) {
    return this.store.findRecord('vacancy', params.id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
