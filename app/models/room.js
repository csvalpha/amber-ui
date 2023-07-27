import Model, { belongsTo, attr } from '@ember-data/model';
import { CoverPhotoFallback } from 'amber-ui/constants';

export default class Room extends Model {
  // Attributes
  @attr house_name;
  @attr location;
  @attr contact;
  @attr description;
  @attr descriptionCamofied;
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
