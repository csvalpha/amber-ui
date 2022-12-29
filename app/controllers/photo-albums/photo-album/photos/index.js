import Controller from '@ember/controller';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default class PhotosIndexController extends Controller {
  @service fetch;
  @service fileSaver;

  get sortedPhotos() {
    return this.model.get('sortedPhotos');
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
