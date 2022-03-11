import Model, { hasMany, attr, belongsTo } from '@ember-data/model';

export default class PhotoAlbum extends Model {
  // Properties
  @attr title;
  @attr date;
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
