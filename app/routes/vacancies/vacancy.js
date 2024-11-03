import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class VacancyRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.title };
  }

  canAccess() {
    return this.abilities.can('show vacancies');
  }

  model(params) {
    return this.store.findRecord('vacancy', params.id, params);
  }
}
