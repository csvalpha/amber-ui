import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewPhotoAlbumRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Foto album aanmaken' }

  canAccess() {
    return this.can.can('create photo-album');
  }

  model() {
    return this.store.createRecord('photo-album');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
