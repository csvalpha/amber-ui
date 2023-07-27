import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class RoomRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.title };
  }

  canAccess() {
    return this.abilities.can('show rooms');
  }

  model(params) {
    return this.store.findRecord('room', params.id, params);
  }
}
