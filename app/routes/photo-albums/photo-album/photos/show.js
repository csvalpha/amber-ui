import { computed } from '@ember/object';
import { ShowRouteUnauthenticated } from 'alpha-amber/routes/application/show';

import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts
} from 'ember-keyboard-shortcuts';

export default ShowRouteUnauthenticated.extend({
  canAccess() {
    return this.can.can('show photo-albums');
  },

  activate() {
    bindKeyboardShortcuts(this);
  },

  deactivate() {
    unbindKeyboardShortcuts(this);
  },

  modelName: 'photo',
  modelRouteParam: 'photo_id',

  title: computed('controller.model.id', 'controller.model.photoAlbum.photos', 'controller.model.photos.[]', function() {
    const photo = this.controller.model;
    const allAlbumPhotos = this.controller.model.photoAlbum.photos;
    const photoAlbumPhotosLength = allAlbumPhotos.get('length');
    const currentPhotoIndex = allAlbumPhotos.indexOf(photo) + 1;

    return `Foto ${currentPhotoIndex} van ${photoAlbumPhotosLength}`;
  }),

  pageActions: computed('can', 'controller.model', function() {
    return [
      {
        link: 'photo-albums.photo-album.photos.destroy',
        linkArgument: this.controller.model,
        title: 'Foto verwijderen',
        icon: 'trash',
        canAccess: this.can.can('destroy photos')
      }
    ];
  }),

  keyboardShortcuts: {
    left: 'goToPreviousPhoto',
    up: 'goToPreviousPhoto',
    right: 'goToNextPhoto',
    down: 'goToNextPhoto'
  },

  actions: {
    goToPreviousPhoto() {
      this.controller.send('goToPreviousPhoto');
    },
    goToNextPhoto() {
      this.controller.send('goToNextPhoto');
    }
  }
});
