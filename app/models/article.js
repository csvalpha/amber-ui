import Model, { hasMany, belongsTo, attr } from '@ember-data/model';
import { CoverPhotoFallback, AvatarFallback, AvatarThumbFallback } from 'alpha-amber/constants';

export default class Article extends Model {
  // Attributes
  @attr('string') title;
  @attr('string') content;
  @attr('string') contentCamofied;
  @attr('string') authorName;
  @attr('date') createdAt;
  @attr('date') updatedAt;
  @attr('boolean', { defaultValue: false }) publiclyVisible;
  @attr('boolean', { defaultValue: false }) pinned;
  @attr('number') amountOfComments;
  @attr coverPhoto;
  @attr coverPhotoUrl;
  @attr avatar;
  @attr avatarUrl;
  @attr avatarThumbUrl;

  // Relations
  @belongsTo('user') author;
  @belongsTo('group') group;
  @hasMany('articleComment') comments;

  // Getters
  get excerpt() {
    const maxExcerptLength = 218;
    if (this.content && this.content.length > maxExcerptLength) {
      return `${this.content.substr(0, this.content.lastIndexOf(' ', maxExcerptLength))}...`;
    }

    return this.content;
  }

  get coverPhotoUrlOrDefault() {
    return this.coverPhotoUrl || CoverPhotoFallback;
  }

  get avatarUrlOrDefault() {
    return this.avatarUrl || AvatarFallback;
  }

  get avatarThumbUrlOrDefault() {
    return this.avatarThumbUrl || AvatarThumbFallback;
  }

  // Methods
  isOwner(user) {
    if (user.id === this.author.id) {
      return true;
    }

    return user.get('memberships').then(() => {
      return user.get('currentMemberships').some(membership => membership.group.id === this.group.id);
    });
  }
}
