import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class PhotoAlbumIndexRoute extends ApplicationRoute {
  beforeModel() {
    this.transitionTo('photo-albums.photo-album.photos');
  }
}
