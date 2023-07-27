import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class RoomEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Kamer advertentie aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit room', model);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
