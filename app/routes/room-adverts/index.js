import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class RoomAdvertsIndexRoute extends AuthenticatedRoute {
  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  get pageActions() {
    return [
      {
        link: 'room-adverts.new',
        title: 'Nieuwe kamer advertentie',
        icon: 'plus',
        canAccess: this.abilities.can('create room-adverts'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show room-adverts');
  }

  model(params) {
    params.perPage = 6;
    return this.store.queryPaged('room-advert', params);
  }
}
