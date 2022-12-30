import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class VacanciesIndexRoute extends AuthenticatedRoute {
  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  get pageActions() {
    return [
      {
        link: 'vacancies.new',
        title: 'Nieuwe vacature',
        icon: 'plus',
        canAccess: this.abilities.can('create vacancies'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show vacancies');
  }

  model(params) {
    params.perPage = 12;
    return this.store.queryPaged('vacancy', params);
  }
}
