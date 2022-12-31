import Model, { belongsTo, attr } from '@ember-data/model';
import { CoverPhotoFallback, AvatarThumbFallback } from 'amber-ui/constants';

export default class Vacancy extends Model {
  // Attributes
  @attr title;
  @attr description;
  @attr descriptionCamofied;
  @attr authorName;
  @attr workload;
  @attr workloadPeak;
  @attr contact;
  @attr('date') deadline;
  @attr('date') createdAt;
  @attr('date') updatedAt;
  @attr coverPhoto;
  @attr coverPhotoUrl;
  @attr avatarThumbUrl;

  // Relations
  @belongsTo('user') author;
  @belongsTo('group') group;

  // Getters
  get coverPhotoUrlOrDefault() {
    return this.coverPhotoUrl || CoverPhotoFallback;
  }

  get avatarThumbUrlOrDefault() {
    return this.avatarThumbUrl || AvatarThumbFallback;
  }

  isOwner(user) {
    if (user.get('id') === this.author.get('id')) {
      return true;
    }

    return user.currentMemberships.some(
      (membership) => membership.group.get('id') === this.group.get('id')
    );
  }
}
