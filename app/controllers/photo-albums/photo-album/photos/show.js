import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { Promise } from 'rsvp';

export default Controller.extend({
  session: service(),
  store: service(),
  flashNotice: service('flash-notice'),
  content: null,
  showExif: false,
  advanceToPhoto(delta) {
    const photos = this.model.photoAlbum.get('photos');
    const length = photos.get('length');
    const index = (photos.indexOf(this.model) + delta + length) % length;
    return this.transitionToRoute(
      'photo-albums.photo-album.photos.show',
      photos.objectAt(index)
    );
  },
  actions: {
    goToPreviousPhoto() {
      return this.advanceToPhoto(-1);
    },
    goToNextPhoto() {
      return this.advanceToPhoto(1);
    },
    submitPhotoComment() {
      return new Promise((resolve, reject) => {
        const content = this.content.trim();

        if (content.length > 0) {
          const photo = this.model;
          const photoComment = this.store.createRecord('photoComment', {
            content,
            photo,
          });

          photoComment
            .save()
            .then(() => {
              this.flashNotice.sendSuccess('Reactie opgeslagen!');
              photo.reload(); // Reload for updated Photo#amountOfComments
              resolve();
            })
            .catch(reject);
        } else {
          reject();
        }

        this.set('content', null);
      });
    },
    toggleShowExif() {
      this.toggleProperty('showExif');
    },
  },
});
