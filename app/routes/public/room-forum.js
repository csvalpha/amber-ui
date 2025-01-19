import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class RoomAdvertsRoute extends ApplicationRoute {
  model(params) {
    params.perPage = 5;
    return this.store.queryPaged('room-advert', params);
  }
}
