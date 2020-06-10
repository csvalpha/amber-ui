import classic from 'ember-classic-decorator';
import Model, { hasMany, attr } from '@ember-data/model';

@classic
export default class Group extends Model {
  // Properties
  @attr name;
  @attr kind;
  @attr description;
  @attr descriptionCamofied;
  @attr recognizedAtGma;
  @attr rejectedAtGma;
  @attr createdAt;
  @attr({ defaultValue: false }) administrative;
  @attr avatar;
  @attr avatarUrl;
  @attr avatarThumbUrl;

  // Relations
  @hasMany memberships;
  @hasMany permissions;
  @hasMany({ inverse: 'group' }) mailAliases;
  @hasMany({ inverse: 'moderatorGroup' }) moderatorForMailAliases;

  // Setters
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
