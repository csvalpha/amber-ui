import { inject as service } from '@ember/service';
import NewPhotoAlbumController from '../new';

export default class EditPhotoAlbumController extends NewPhotoAlbumController {
  successMessage = "Wijzigen en/of foto's toevoegen gelukt!";
  cancelMessage = "Wijzigen en/of foto's toevoegen geannuleerd.";
  successTransitionTarget = 'photo-albums.photo-album.show';
  cancelTransitionTarget = this.successTransitionTarget;
  cancelTransitionModel = this.model;
  @service fetch;

  get dropzoneHeaders() {
    return { Authorization: this.fetch.authorizationHeader() };
  }
}
