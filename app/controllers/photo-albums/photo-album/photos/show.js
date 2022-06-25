import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service(),
  advanceToPhoto(delta) {
    const photos = this.model.photoAlbum.get('sortedPhotos');
    const length = photos.get('length');
    const index = (photos.indexOf(this.model) + delta + length) % length;
    this.route;
    return this.replaceRoute(
      'photo-albums.photo-album.photos.show',
      photos.objectAt(index)
    );
  },
  actions: {
    goToPreviousPhoto() {
      return this.advanceToPhoto(-1);
    },
    goToNextPhoto() {
      return this.advanceToPhoto(1);
    },
    onSwipe(direction) {
      return this.advanceToPhoto(-direction);
    },
  },
});
