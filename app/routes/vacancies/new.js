import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class VacanciesNewRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Vacature aanmaken' };

  canAccess() {
    return this.abilities.can('create vacancies');
  }

  model() {
    return this.store.createRecord('vacancy');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
