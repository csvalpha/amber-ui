import { inject as service } from '@ember/service';
import Model, { hasMany, attr } from '@ember-data/model';
import { isEmpty } from '@ember/utils';
import moment from 'moment';
import { AvatarThumbFallback, AvatarFallback } from "../constants";

export default class User extends Model {
  @service session;

  // General properties
  @attr firstName;
  @attr lastNamePrefix;
  @attr lastName;
  @attr birthday;
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
  @attr startStudy;
  @attr emergencyContact;
  @attr emergencyNumber;
  @attr almanakSubscriptionPreference;
  @attr digtusSubscriptionPreference;

  // Privacy settings
  @attr picturePublicationPreference;

  @attr ifesDataSharingPreference;
  @attr({ allowNull: true }) allowTomatoSharing;
  @attr infoInAlmanak;
  @attr userDetailsSharingPreference;
  // Security properties
  @attr otpRequired;
  @attr icalSecretKey;
  @attr webdavSecretKey;
  @attr password;

  // Technical properties
  @attr loginEnabled;
  @attr activatedAt;
  @attr createdAt;
  @attr updatedAt;

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

  // Computed properties
  get fullName() {
    if (this.lastNamePrefix === null) {
      return `${this.firstName} ${this.lastName}`;
    }

    return `${this.firstName} ${this.lastNamePrefix} ${this.lastName}`;
  }

  get age() {
    return moment().diff(this.birthday, 'years');
  }

  get upcomingBirthdayAge() {
    return this.age + 1;
  }

  get upcomingBirthdayDate() {
    return moment(this.birthday).add(this.upcomingBirthdayAge, 'years').toDate();
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
    return this.memberships.filter(membership => membership.get('userIsCurrentlyMember'));
  }

  get avatarUrlOrDefault() {
    return this.avatarUrl || AvatarFallback;
  }

  get avatarThumbUrlOrDefault() {
    return this.avatarThumbUrl || AvatarThumbFallback;
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
