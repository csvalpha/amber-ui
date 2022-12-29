import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PhotoAlbumDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Fotoalbum verwijderen' };

  canAccess() {
    return this.abilities.can('destroy photo-albums');
  }
}
