import DestroyController from 'alpha-amber/controllers/application/destroy';

export default DestroyController.extend({
  successMessage: 'Fotoreactie verwijderd!',
  actions: {
    destroy() {
      this.set('photoAlbum', this.model.photo.get('photoAlbum'));
      this._super(...arguments);
    },
    onSuccess() {
      this._super(...arguments);
      this.transitionToRoute('photo-albums.photo-album.show', this.photoAlbum);
    }
  }
});
