import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class PhotoShowController extends Controller {
  @service session;

  @action
  goToPreviousPhoto() {
    return this.advanceToPhoto(-1);
  }

  @action
  goToNextPhoto() {
    return this.advanceToPhoto(1);
  }

  @action
  onSwipe(direction) {
    return this.advanceToPhoto(-direction);
  }

  advanceToPhoto(delta) {
    const photos = this.model.photoAlbum.get('sortedPhotos');
    const length = photos.get('length');
    const index = (photos.indexOf(this.model) + delta + length) % length;
    this.route;
    return this.replaceRoute(
      'photo-albums.photo-album.photos.show',
      photos.objectAt(index)
    );
  }
}
