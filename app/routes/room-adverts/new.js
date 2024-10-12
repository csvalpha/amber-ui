import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class RoomAdvertsNewRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Kamer advertentie aanmaken' };

  canAccess() {
    return this.abilities.can('create room-adverts');
  }

  model() {
    return this.store.createRecord('room-advert');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
