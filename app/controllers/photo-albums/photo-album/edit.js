import NewPhotoAlbumController from 'alpha-amber/controllers/photo-albums/new';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EditPhotoAlbumController extends NewPhotoAlbumController {
  @service fetch;

  successTransitionTarget = 'photo-albums.photo-album';

  @computed(function() {
    return { 'Authorization': this.fetch.authorizationHeader() };
  })
  dropzoneHeaders;
}
