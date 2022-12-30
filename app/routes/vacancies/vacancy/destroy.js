import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class VacancyDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Vacature verwijderen' };

  canAccess() {
    return this.abilities.can('destroy vacancies');
  }
}
