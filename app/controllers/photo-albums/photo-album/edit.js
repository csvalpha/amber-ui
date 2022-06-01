// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed } from '@ember/object';
import NewPhotoAlbumController from 'amber-ui/controllers/photo-albums/new';
import { inject as service } from '@ember/service';

export default class EditPhotoAlbumController extends NewPhotoAlbumController {
  @service fetch;

  @action
  submit() {
    const photoAlbum = this.model;
    photoAlbum
      .save()
      .then(() => {
        photoAlbum.photos.reload();
        // Only pass id when force reload is required, see http://emberigniter.com/force-store-reload-data-api-backend/
        this.transitionToRoute('photo-albums.photo-album', photoAlbum.id);
      })
      .catch((error) => {
        this.set('errorMessage', error.message);
      });
  }

  @computed(function () {
    return { Authorization: this.fetch.authorizationHeader() };
  })
  dropzoneHeaders;
}
