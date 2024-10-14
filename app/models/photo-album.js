import Model, { hasMany, attr, belongsTo } from '@ember-data/model';

export default class PhotoAlbum extends Model {
  // Properties
  @attr title;
  @attr('date-only') date;
  @attr({ defaultValue: false }) publiclyVisible;

  // Relations
  @hasMany photos;
  @belongsTo('user') author;
  @belongsTo('group') group;

  // Getters
  get dropzoneEndpoint() {
    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.dropzoneEndpoint(this);
  }

  get albumThumbUrl() {
    return (
      this.photos?.firstObject?.imageThumbUrl ||
      '/images/fallback/photo_album_thumb_default.png'
    );
  }

  get albumMediumUrl() {
    return (
      this.photos?.firstObject?.imageMediumUrl ||
      '/images/fallback/photo_album_thumb_default.png'
    );
  }

  get sortedPhotos() {
    return this.photos?.sortBy('exifDateTimeOriginal', 'createdAt');
  }

  get amountOfTags() {
    var counter = 0
    for(var photo of this.photos._objects){
      counter += photo.amountOfTags
    } 
    return counter
  }
  get amountOfTaggedPhotos() {
    var counter = 0
    for(var photo of this.photos._objects){
      counter += photo.amountOfTags>0? 1 : 0
    } 
    return counter
  }
  get amountOfPhotos() {
    return this.photos.length
  }

  // Methods
  isOwner(user) {
    if (user.get('id') === this.author.get('id')) {
      return true;
    }

    return user.currentMemberships.some(
      (membership) => membership.group.get('id') === this.group.get('id')
    );
  }
}
