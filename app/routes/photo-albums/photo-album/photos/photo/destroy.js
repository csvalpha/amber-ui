import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PhotoDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Foto verwijderen' };

  canAccess() {
    return this.abilities.can('destroy photos');
  }
}
