import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class RoomAdvertDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Kamer advertentie verwijderen' };

  canAccess(model) {
    return this.abilities.can('destroy room-adverts', model);
  }
}
