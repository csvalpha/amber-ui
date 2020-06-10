import Model, { hasMany, attr } from '@ember-data/model';

export default class PhotoAlbum extends Model {
  // Properties
  @attr title;
  @attr date;
  @attr({ defaultValue: false }) publiclyVisible;

  // Relations
  @hasMany photos;

  // Getters
  get dropzoneEndpoint() {
    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.dropzoneEndpoint(this);
  }

  get albumThumbUrl() {
    return this.get('photos.firstObject.imageThumbUrl') || '/images/fallback/photo_album_thumb_default.png';
  }

  get albumMediumUrl() {
    return this.get('photos.firstObject.imageMediumUrl') || '/images/fallback/photo_album_thumb_default.png';
  }
}
