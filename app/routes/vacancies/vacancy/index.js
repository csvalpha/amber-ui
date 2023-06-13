import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class VacancyIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    const vacancy = this.controller.model;
    return [
      {
        link: 'vacancies.vacancy.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: vacancy,
        canAccess: this.abilities.can('edit vacancy', vacancy),
      },
      {
        link: 'vacancies.vacancy.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: vacancy,
        canAccess: this.abilities.can('destroy vacancies'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show vacancies');
  }
}
