import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PhotoAlbumEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Fotoalbum aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit photo-albums', model);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
