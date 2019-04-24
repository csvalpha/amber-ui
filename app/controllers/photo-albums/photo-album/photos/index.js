import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { dasherize } from '@ember/string';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Controller.extend(FileSaverMixin, {
  fetch: service(),
  photoSorting: ['-createdAt'],
  sortedPhotos: sort('model.photos', 'photoSorting'),
  actions: {
    downloadAlbum() {
      let model = this.get('model');
      return this.get('fetch').fetch(`/photo_albums/${model.id}/zip`).then(response => {
        return response.blob().then(blob => {
          this.saveFileAs(`${moment(model.get('date')).format('YYYY-MM-DD')}_${dasherize(model.get('title'))}.zip`, blob, 'application/octet-stream');
        });
      });
    }
  }
});
