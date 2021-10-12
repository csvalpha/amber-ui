import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { dasherize } from '@ember/string';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Controller.extend(FileSaverMixin, {
  fetch: service(),
  photoSorting: ['exifDateTimeOriginal', 'createdAt'],
  sortedPhotos: sort('model.photos', 'photoSorting'),
  actions: {
    downloadAlbum() {
      return this.fetch.fetch(`/photo_albums/${this.model.id}/zip`).then(response => {
        return response.blob().then(blob => {
          let filename = `${moment(this.model.get('date')).format('YYYY-MM-DD')}_${dasherize(this.model.get('title'))}.zip`;
          this.saveFileAs(filename, blob, 'application/octet-stream');
        });
      });
    }
  }
});
