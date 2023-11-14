import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class PhotoCommentDestroyController extends DestroyController {
  successMessage = 'Foto reactie verwijderd!';
  successTransitionTarget = 'photo-albums.photo-album.photos.photo';
  cancelTransitionTarget = 'photo-albums.photo-album.photos.photo';

  get successTransitionModel() {
    return this.photo;
  }

  get cancelTransitionModel() {
    return this.photo;
  }

  @action
  async destroyModel() {
    this.photo = await this.model.photo;
    super.destroyModel();
  }

  @action
  async cancel() {
    this.photo = await this.model.photo;
    super.cancel();
  }

  // TODO: is this a supported method override? I can't find docs about this
  //  anywhere.
  async transition(transitionTarget, transitionModelId) {
    const photoAlbumModel = await this.photo.photoAlbum;
    this.transitionToRoute(
      transitionTarget,
      photoAlbumModel.id,
      transitionModelId
    );
  }
}
