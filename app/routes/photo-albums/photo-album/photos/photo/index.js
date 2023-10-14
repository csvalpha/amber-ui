import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts,
} from 'ember-keyboard-shortcuts';
import { ApplicationRoute } from 'amber-ui/routes/application/application';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PhotoIndexRoute extends ApplicationRoute {
  @service intl;

  keyboardShortcuts = {
    left: 'goToPreviousPhoto',
    up: 'goToPreviousPhoto',
    right: 'goToNextPhoto',
    down: 'goToNextPhoto',
  };

  get breadcrumb() {
    const photo = this.controller.model;
    const allAlbumPhotos = this.controller.model.photoAlbum.get('sortedPhotos');
    const photoAlbumPhotosLength = allAlbumPhotos.get('length');
    const currentPhotoIndex = allAlbumPhotos.indexOf(photo) + 1;

    return { title: `Foto ${currentPhotoIndex} van ${photoAlbumPhotosLength}` };
  }

  get pageActions() {
    return [
      {
        link: 'photo-albums.photo-album.photos.photo.destroy',
        linkArgument: this.controller.model,
        title: 'Foto verwijderen',
        icon: 'trash',
        canAccess: this.abilities.can('destroy photos'),
      },
    ];
  }

  @action
  goToPreviousPhoto() {
    this.controller.send('goToPreviousPhoto');
  }

  @action
  goToNextPhoto() {
    this.controller.send('goToNextPhoto');
  }

  activate() {
    bindKeyboardShortcuts(this);
  }

  deactivate() {
    unbindKeyboardShortcuts(this);
  }
}
