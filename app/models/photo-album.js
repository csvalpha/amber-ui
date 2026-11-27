import Model, { hasMany, attr, belongsTo } from '@ember-data/model';

export default class PhotoAlbum extends Model {
  // Properties
  @attr title;
  @attr('date-only') date;
  @attr({ defaultValue: 'members' }) visibility;

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

  get amountOfTaggedPhotos() {
    var counter = 0;
    this.photos.content.forEach((photo) => {
      counter += photo.amountOfTags > 0 ? 1 : 0;
    });
    return counter;
  }

  get amountOfPhotos() {
    return this.photos.length;
  }

  get isPublic() {
    return this.visibility === 'public';
  }

  get visibilityOptions() {
    return [
      { value: 'public', label: 'Iedereen, ook externen' },
      { value: 'alumni', label: 'Leden en alle oud-leden' },
      {
        value: 'members',
        label: 'Leden, en oud-leden die rond de datum van het album lid waren',
      },
    ];
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
