import { action } from '@ember/object';
import Controller from '@ember/controller';
import { dasherize } from '@ember/string';
import { inject as service } from '@ember/service';

export default class PhotoAlbumPhotosIndexController extends Controller {
  @service fetch;
  @service('file-saver') fileSaver;

  photoSorting = ['exifDateTimeOriginal', 'createdAt'];

  get sortedPhotos() {
    return this.model.photos.sortBy(...this.photoSorting);
  }

  @action
  downloadAlbum() {
    return this.fetch
      .fetch(`/photo_albums/${this.model.id}/zip`)
      .then((response) => {
        return response.blob().then((blob) => {
          let filename = `${moment(this.model.get('date')).format(
            'YYYY-MM-DD'
          )}_${dasherize(this.model.get('title'))}.zip`;
          this.fileSaver.saveFileAs(filename, blob, 'application/octet-stream');
        });
      });
  }
}
