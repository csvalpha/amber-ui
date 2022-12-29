import PhotoAlbumsNewController from '../new';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

// TODO: it would follow the pattern more if we let the PhotoAlbumsNewController
//  extend the EditPhotoAlbumController, instead of vice versa.
export default class PhotoAlbumEditController extends PhotoAlbumsNewController {
  @service fetch;

  successMessage = "Wijzigen en/of foto's toevoegen gelukt!";
  cancelMessage = "Wijzigen en/of foto's toevoegen geannuleerd.";
  successTransitionTarget = 'photo-albums.photo-album';
  cancelTransitionTarget = this.successTransitionTarget;

  get cancelTransitionModel() {
    return this.successTransitionModel;
  }

  get dropzoneHeaders() {
    return { Authorization: this.fetch.authorizationHeader() };
  }

  @action
  submit() {
    super.submit();
    this.model.photos.reload();
  }
}
