import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class RoomAdvertRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.houseName };
  }

  canAccess() {
    return this.abilities.can('show room-adverts');
  }

  model(params) {
    return this.store.findRecord('room-advert', params.id, params);
  }
}
