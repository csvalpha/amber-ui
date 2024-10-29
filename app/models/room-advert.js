import Model, { belongsTo, attr } from '@ember-data/model';
import { CoverPhotoFallback } from 'amber-ui/constants';

export default class RoomAdvert extends Model {
  // Attributes
  @attr houseName;
  @attr contact;
  @attr location;
  @attr availableFrom;
  @attr description;
  @attr descriptionCamofied;
  @attr authorName;
  @attr('date') createdAt;
  @attr('date') updatedAt;
  @attr coverPhoto;
  @attr coverPhotoUrl;
  @attr({ defaultValue: false }) publiclyVisible;

  // Relations
  @belongsTo('user') author;

  // Getters
  get coverPhotoUrlOrDefault() {
    return this.coverPhotoUrl || CoverPhotoFallback;
  }

  isOwner(user) {
    return user.get('id') === this.author.get('id');
  }
}
