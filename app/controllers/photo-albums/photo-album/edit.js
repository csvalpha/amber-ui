import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import NewPhotoAlbumController from '../new';

// todo: it would follow the pattern more if we let the NewPhotoAlbumController extend the EditPhotoAlbumController,
//  instead of vice versa
export default class EditPhotoAlbumController extends NewPhotoAlbumController {
  successMessage = "Wijzigen en/of foto's toevoegen gelukt!";
  cancelMessage = "Wijzigen en/of foto's toevoegen geannuleerd.";
  successTransitionTarget = 'photo-albums.photo-album.show';
  cancelTransitionTarget = this.successTransitionTarget;

  get cancelTransitionModel() {
    return this.successTransitionModel;
  }

  @service fetch;

  get dropzoneHeaders() {
    return { Authorization: this.fetch.authorizationHeader() };
  }

  @action
  submit() {
    super.submit();
    this.model.photos.reload();
  }
}
