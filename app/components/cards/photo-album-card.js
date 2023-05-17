import Component from '@ember/component';

const PhotoAlbumCardComponent = Component.extend({});

PhotoAlbumCardComponent.reopenClass({
  positionalParams: ['album', 'frontpage'],
});

export default PhotoAlbumCardComponent;
