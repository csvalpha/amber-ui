import Model, { hasMany, attr } from '@ember-data/model';
import { computed } from '@ember/object';
import ENV from '../config/environment';

export default Model.extend({
  // Properties
  title: attr('string'),
  date: attr('date'),
  maxFilesize: ENV.maxFilesize,
  publiclyVisible: attr('boolean', { defaultValue: false }),

  // Relations
  photos: hasMany('photos'),

  // Computed properties
  dropzoneEndpoint: computed('constructor.modelName', 'id', 'store', function() {
    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.dropzoneEndpoint(this);
  }),
  albumThumbUrl: computed('photos.@each.imageThumbUrl', 'photos.firstObject.imageThumbUrl', function() {
    return this.get('photos.firstObject.imageThumbUrl') || '/images/fallback/photo_album_thumb_default.png';
  }),
  albumMediumUrl: computed('photos.@each.imageMediumUrl', 'photos.firstObject.imageMediumUrl', function() {
    return this.get('photos.firstObject.imageMediumUrl') || '/images/fallback/photo_album_thumb_default.png';
  })
});
