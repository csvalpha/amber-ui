// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import EditController from "../../application/edit";
import NewPhotoAlbumController from "../new";

export default class EditPhotoAlbumController extends NewPhotoAlbumController {
  successMessage = "Wijzigen en/of foto's toevoegen gelukt!";
  cancelMessage = "Wijzigen en/of foto's toevoegen geannuleerd.";
  successTransitionTarget = 'photo-albums.photo-album.show';
  cancelTransitionTarget = this.successTransitionTarget;
  cancelTransitionModel = this.model;
  @service fetch;

  @computed(function () {
    return { Authorization: this.fetch.authorizationHeader() };
  })
  dropzoneHeaders;
}
