import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class RoomsNewRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Kamer advertentie aanmaken' };

  canAccess() {
    return this.abilities.can('create rooms');
  }

  model() {
    return this.store.createRecord('room');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
