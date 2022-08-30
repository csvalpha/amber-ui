import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class PhotoCommentDestroyController extends DestroyController {
  successMessage = 'Fotoreactie verwijderd!';
  successTransitionTarget = 'photo-albums.photo-album.show';
  @action
  async destroyModel() {
    this.successTransitionModel = await this.model.photo.get('photoAlbum');
    super.destroyModel();
  }

}
