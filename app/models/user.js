import Ember from 'ember';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Model, { hasMany, attr } from '@ember-data/model';
import { isEmpty } from '@ember/utils';
import moment from 'moment';
import { AvatarThumbFallback, AvatarFallback } from 'amber-ui/constants';

export default class User extends Model {
  @service session;

  // General properties
  @attr firstName;
  @attr lastNamePrefix;
  @attr lastName;
  @attr nickname;
  @attr('date-only') birthday;
  @attr address;
  @attr postcode;
  @attr city;
  @attr phoneNumber;
  @attr email;
  @attr username;
  @attr study;

  // Preferences / settings
  @attr foodPreferences;
  @attr vegetarian;
  @attr trailerDriversLicense;
  @attr('date-only') startStudy;

  // Restricted Settings
  @attr emergencyContact;
  @attr emergencyNumber;
  @attr almanakSubscriptionPreference;
  @attr digtusSubscriptionPreference;

  // Privacy settings
  @attr picturePublicationPreference;
  @attr ifesDataSharingPreference;
  @attr allowTomatoSharing;
  @attr infoInAlmanak;
  @attr userDetailsSharingPreference;

  // Security properties
  @attr otpRequired;
  @attr icalSecretKey;
  @attr password;

  // Technical properties
  @attr loginEnabled;
  @attr('date') activatedAt;
  @attr('date') createdAt;
  @attr('date') updatedAt;
  @attr sidekiqAccess;
  @attr setupComplete;

  // Avatar
  @attr avatar;
  @attr avatarUrl;
  @attr avatarThumbUrl;

  // Relations
  @hasMany permissions;
  @hasMany('permissions') userPermissions;
  @hasMany memberships;
  @hasMany groups;
  @hasMany('debit/mandate') mandates;
  @hasMany mailAliases;
  @hasMany('mail-alias') groupMailAliases;
  @hasMany('photo-tags', { inverse: 'author' }) createdPhotoTags;
  @hasMany('photo-tags', { inverse: 'taggedUser' }) photoTags;
  @hasMany('photos') photos;

  // Computed properties
  get fullName() {
    if (this.lastNamePrefix === null) {
      return `${this.firstName} ${this.lastName}`;
    }

    return `${this.firstName} ${this.lastNamePrefix} ${this.lastName}`;
  }

  get fullNickname() {
    if (this.lastNamePrefix === null) {
      return `${this.nickname} ${this.lastName}`;
    }

    return `${this.nickname} ${this.lastNamePrefix} ${this.lastName}`;
  }

  get fullNameWithNickname() {
    return this._fullNameWithNickname();
  }

  get fullNameWithNicknameMd() {
    return this._fullNameWithNickname(true);
  }

  _fullNameWithNickname(markdown = false) {
    let escape = Ember.Handlebars.Utils.escapeExpression;
    let name = `${escape(this.firstName)}`;

    if (this.nickname !== null) {
      if (markdown) name += ` *${escape(this.nickname)}*`;
      else name += ` <i>${escape(this.nickname)}</i>`;
    }

    if (this.lastNamePrefix !== null) {
      name += ` ${escape(this.lastNamePrefix)}`;
    }

    return htmlSafe(`${name} ${escape(this.lastName)}`);
  }

  get age() {
    return moment().diff(this.birthday, 'years');
  }

  get upcomingBirthdayAge() {
    return this.age + 1;
  }

  get upcomingBirthdayDate() {
    return moment(this.birthday)
      .add(this.upcomingBirthdayAge, 'years')
      .toDate();
  }

  get hasBirthdayToday() {
    const birthdayDate = moment(this.birthday);

    const monthIsTheSame = moment().month() === birthdayDate.month();
    const dayOfMonthIsTheSame = moment().date() === birthdayDate.date();

    return monthIsTheSame && dayOfMonthIsTheSame;
  }

  hasPermission(name) {
    return this.permissions.findBy('name', name) !== undefined;
  }

  get isCurrentUser() {
    return this.session.currentUser.id === this.id;
  }

  get currentMemberships() {
    return this.memberships.filter((membership) =>
      membership.get('userIsCurrentlyMember')
    );
  }

  get avatarUrlOrDefault() {
    return this.avatarUrl || AvatarFallback;
  }

  get avatarThumbUrlOrDefault() {
    return this.avatarThumbUrl || AvatarThumbFallback;
  }

  get sortedPhotos() {
    return this.photos?.sortBy('exifDateTimeOriginal', 'createdAt');
  }

  // Methods
  setNullIfEmptyString(property) {
    const value = this.get(property);
    if (value !== undefined && value !== null && isEmpty(value.trim())) {
      this.set(property, null);
    }
  }

  save(...args) {
    this.setNullIfEmptyString('lastNamePrefix');
    this.setNullIfEmptyString('foodPreferences');
    return super.save(...args);
  }
}
