import DestroyController from 'alpha-amber/controllers/application/destroy';

export default DestroyController.extend({
  successMessage: 'Fotoreactie verwijderd!',
  actions: {
    destroy() {
      this.set('photoAlbum', this.get('model.photo.photoAlbum'));
      this._super(...arguments);
    },
    onSuccess() {
      this._super(...arguments);
      this.transitionToRoute('photo-album.show', this.get('photoAlbum'));
    }
  }
});
