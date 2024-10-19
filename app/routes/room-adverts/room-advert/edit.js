import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class RoomAdvertEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Kamer advertentie aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit room-advert', model);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
