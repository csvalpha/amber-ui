import { ApplicationRoute } from 'alpha-amber/routes/application/application';

export default class ShowPhotoAlbumRoute extends ApplicationRoute {
  canAccess() {
    return this.can.can('show photo-albums');
  }

  beforeModel() {
    this.transitionTo('photo-albums.photo-album.photos');
  }
}
