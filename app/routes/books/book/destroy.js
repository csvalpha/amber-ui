import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class BookDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Boek verwijderen' };

  canAccess() {
    return this.abilities.can('destroy books');
  }
}
