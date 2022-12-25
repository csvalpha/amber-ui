import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyVacancyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Vacature verwijderen' };

  canAccess() {
    return this.abilities.can('destroy vacancies');
  }

  model(params) {
    return this.store.findRecord('vacancy', params.id, params);
  }
}
