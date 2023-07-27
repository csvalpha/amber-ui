import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class RoomsIndexRoute extends AuthenticatedRoute {
  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  get pageActions() {
    return [
      {
        link: 'rooms.new',
        title: 'Nieuwe kamer advertentie',
        icon: 'plus',
        canAccess: this.abilities.can('create rooms'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show rooms');
  }

  model(params) {
    params.perPage = 6;
    return this.store.queryPaged('room', params);
  }
}
