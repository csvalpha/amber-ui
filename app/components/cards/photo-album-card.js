import Component from '@ember/component';

const PhotoAlbumCardComponent = Component.extend({});

PhotoAlbumCardComponent.reopenClass({
  positionalParams: ['album'],
});

export default PhotoAlbumCardComponent;
