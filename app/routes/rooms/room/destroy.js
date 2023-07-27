import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class RoomDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Kamer advertentie verwijderen' };

  canAccess() {
    return this.abilities.can('destroy rooms');
  }
}
