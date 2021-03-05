import { ApplicationRoute } from 'alpha-amber/routes/application/application';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts
} from 'ember-keyboard-shortcuts';

export default class ShowPhotosRoute extends ApplicationRoute {
  @service intl

  get breadCrumb() {
    const photo = this.controller.model;
    const allAlbumPhotos = this.controller.model.photoAlbum.get('photos');
    const photoAlbumPhotosLength = allAlbumPhotos.get('length');
    const currentPhotoIndex = allAlbumPhotos.indexOf(photo) + 1;

    return { title: `Foto ${currentPhotoIndex} van ${photoAlbumPhotosLength}` };
  }

  get pageActions() {
    return [
      {
        link: 'photo-albums.photo-album.photos.destroy',
        linkArgument: this.controller.model,
        title: 'Foto verwijderen',
        icon: 'trash',
        canAccess: this.can.can('destroy photos')
      }
    ];
  }

  canAccess() {
    return this.can.can('show photo-albums');
  }

  model(params) {
    return this.store.findRecord('photo', params.photo_id, params);
  }

  activate() {
    bindKeyboardShortcuts(this);
  }

  deactivate() {
    unbindKeyboardShortcuts(this);
  }

  keyboardShortcuts = {
    left: 'goToPreviousPhoto',
    up: 'goToPreviousPhoto',
    right: 'goToNextPhoto',
    down: 'goToNextPhoto'
  }

  @action
  goToPreviousPhoto() {
    this.controller.send('goToPreviousPhoto');
  }

  @action
  goToNextPhoto() {
    this.controller.send('goToNextPhoto');
  }
}
