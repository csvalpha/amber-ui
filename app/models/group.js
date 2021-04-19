import Model, { hasMany, attr } from '@ember-data/model';

export default class Group extends Model {
  // Properties
  @attr name;
  @attr kind;
  @attr description;
  @attr descriptionCamofied;
  @attr('string') recognizedAtGma;
  @attr('string') rejectedAtGma;
  @attr('date') createdAt;
  @attr({ defaultValue: false }) administrative;
  @attr avatar;
  @attr avatarUrl;
  @attr avatarThumbUrl;

  // Relations
  @hasMany memberships;
  @hasMany permissions;
  @hasMany({ inverse: 'group' }) mailAliases;
  @hasMany('mail-alias', { inverse: 'moderatorGroup' }) moderatorForMailAliases;

  // Getters
  get recognitionPeriod() {
    if (this.rejectedAtGma !== null) {
      return `${this.recognizedAtGma} - ${this.rejectedAtGma}`;
    }

    if (this.recognizedAtGma !== null) {
      return `${this.recognizedAtGma} - heden`;
    }

    return null;
  }

  get avatarUrlOrDefault() {
    return this.avatarUrl || '/images/fallback/group_avatar_default.png';
  }

  get avatarThumbUrlOrDefault() {
    return this.avatarThumbUrl || '/images/fallback/group_avatar_thumb_default.png';
  }

  // Methods
  rollbackAttributesAndMemberships() {
    this.memberships.forEach(membership => {
      membership?.rollbackAttributes();
    });
    this.rollbackAttributes();
  }
}
