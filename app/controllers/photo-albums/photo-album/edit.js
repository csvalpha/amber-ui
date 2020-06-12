import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  store: service(),
  fetch: service(),

  actions: {
    submit() {
      const photoAlbum = this.model;
      photoAlbum.save().then(() => {
        // Only pass id when force reload is required, see http://emberigniter.com/force-store-reload-data-api-backend/
        this.transitionToRoute('photo-albums.photo-album', photoAlbum.id);
      }).catch(error => {
        this.set('errorMessage', error.message);
      });
    }
  },
  dropzoneHeaders: computed(function() {
    return { 'Authorization': this.fetch.authorizationHeader() };
  })
});
