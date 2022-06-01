import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class NewPhotoAlbumRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Foto album aanmaken' };

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
