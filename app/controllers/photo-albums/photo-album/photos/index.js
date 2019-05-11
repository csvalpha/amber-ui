import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { dasherize } from '@ember/string';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Controller.extend(FileSaverMixin, {
  fetch: service(),
  photoSorting: ['-createdAt'],
  sortedPhotos: sort('model.photos', 'photoSorting'),
  modalIsOpen: false,
  downloadStarted: false,
  downloadFinished: false,
  modalTitle: 'Fotoalbum downloaden',
  modalText: 'Het inpakken en downloaden van het album kan even duren. Terwijl de download bezig is kun je de webstek niet gebruiken en dit tabblad niet sluiten.',
  actions: {
    downloadAlbum() {
      let model = this.get('model');
      this.set('downloadStarted', true);
      this.set('modalTitle', 'Dit kan even duren...');
      this.set('modalText', 'De download is gestart. Terwijl de download bezig is kun je de webstek niet gebruiken en dit tabblad niet sluiten.');

      return this.get('fetch').fetch(`/photo_albums/${model.id}/zip`).then(response => {
        return response.blob().then(blob => {
          this.set('downloadFinished', true);
          this.set('modalTitle', 'De download is gelukt!');
          this.set('modalText', 'Als het goed is heb je nu de mogelijkheid het album ergens op je device op te slaan. Je kunt dit scherm nu veilig sluiten.');

          let filename = `${moment(model.get('date')).format('YYYY-MM-DD')}_${dasherize(model.get('title'))}.zip`;
          this.saveFileAs(filename, blob, 'application/octet-stream');
        });
      });
    },
    openModal() {
      this.set('modalIsOpen', true);
    },
    closeModal() {
      this.set('modalIsOpen', false);
      this.set('downloadStarted', false);
      this.set('downloadFinished', false);
      this.set('modalTitle', 'Fotoalbum downloaden');
      this.set('modalText', 'Het inpakken en downloaden van het album kan even duren. Terwijl de download bezig is kun je de webstek niet gebruiken en dit tabblad niet sluiten. Klik op onderstaande knop om de download te starten.');
    }
  }
});
