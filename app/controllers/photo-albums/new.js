import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  ajax: service(),
  store: service(),

  actions: {
    submit() {
      const photoAlbum = this.get('model');
      photoAlbum.save().then(() => {
        // Only pass id when force reload is required, see http://emberigniter.com/force-store-reload-data-api-backend/
        this.transitionToRoute('photo-albums.photo-album.edit', photoAlbum.id);
      }).catch(error => {
        this.set('errorMessage', error.message);
      });
    }
  }
});
