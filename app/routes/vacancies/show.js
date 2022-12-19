import { inject as service } from '@ember/service';
import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ShowVacancyRoute extends AuthenticatedRoute {
  @service store;

  get breadCrumb() {
    return { title: this.controller.model.title };
  }

  get pageActions() {
    const vacancy = this.controller.model;
    return [
      {
        link: 'vacancies.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: vacancy,
        canAccess: this.abilities.can('edit vacancy', vacancy),
      },
      {
        link: 'vacancies.destroy',
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

  model(params) {
    return this.store.findRecord('vacancy', params.id, params);
  }
}
