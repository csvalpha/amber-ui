import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class PhotoCommentDestroyController extends DestroyController {
  successMessage = 'Fotoreactie verwijderd!';
  successTransitionTarget = 'photo-albums.photo-album.photos.show';
  cancelTransitionTarget = 'photo-albums.photo-album.photos.show';
  photo;
  @action
  async destroyModel() {
    this.photo = await this.model.photo;
    this.successTransitionModel = this.photo;
    super.destroyModel();
  }

  @action
  async cancel() {
    this.photo = await this.model.photo;
    this.cancelTransitionModel = this.photo;
    super.cancel();
  }

  async transition(transitionTarget, transitionModelID) {
    const photoAlbumModel = await this.photo.photoAlbum;
    this.transitionToRoute(transitionTarget, photoAlbumModel.id, transitionModelID);
  }
}
