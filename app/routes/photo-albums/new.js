import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PhotoAlbumsNewRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Fotoalbum aanmaken' };

  canAccess() {
    return this.abilities.can('create photo-album');
  }

  model() {
    return this.store.createRecord('photo-album');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
