import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import DS from 'ember-data';
import moment from 'moment';
import AvatarModelMixin from 'alpha-amber/mixins/avatar-model-mixin';

const { attr, hasMany, Model } = DS;

export default Model.extend(AvatarModelMixin, {
  session: service(),

  // Properties
  username: attr('string'),
  email: attr('string'),
  loginEnabled: attr('boolean'),
  firstName: attr('string'),
  lastNamePrefix: attr('string'),
  lastName: attr('string'),
  birthday: attr('date'),
  address: attr('string'),
  postcode: attr('string'),
  city: attr('string'),
  phoneNumber: attr('string'),
  foodPreferences: attr('string'),
  vegetarian: attr('boolean'),
  study: attr('string'),
  startStudy: attr('date'),
  emergencyContact: attr('string'),
  emergencyNumber: attr('string'),
  almanakSubscriptionPreference: attr('string'),
  digtusSubscriptionPreference: attr('string'),

  // Privacy settings
  picturePublicationPreference: attr('string'),
  ifesDataSharingPreference: attr('boolean'),
  allowTomatoSharing: attr('boolean', { allowNull: true }),
  infoInAlmanak: attr('boolean'),
  userDetailsSharingPreference: attr('string'),

  // Security properties
  otpRequired: attr('boolean'),
  icalSecretKey: attr('string'),
  webdavSecretKey: attr('string'),
  password: attr('string'),

  activatedAt: attr('date'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  // Relations
  permissions: hasMany('permission'),
  userPermissions: hasMany('permission'),
  memberships: hasMany('membership'),
  groups: hasMany('group'),
  mandates: hasMany('debit/mandate'),
  mailAliases: hasMany('mail-alias'),
  groupMailAliases: hasMany('mail-alias'),

  // Computed properties
  fullName: computed('firstName', 'lastNamePrefix', 'lastName', function() {
    if (this.get('lastNamePrefix') === null) {
      return `${this.get('firstName')} ${this.get('lastName')}`;
    }
    return `${this.get('firstName')} ${this.get('lastNamePrefix')} ${this.get('lastName')}`;
  }),

  age: computed('birthday', function() {
    return moment().diff(this.get('birthday'), 'years');
  }),

  upcomingBirthdayAge: computed('age', function() {
    return this.get('age') + 1;
  }),

  upcomingBirthdayDate: computed('birthday', function() {
    const birthday = this.get('birthday');
    return moment(birthday).add(this.get('upcomingBirthdayAge'), 'years').toDate();
  }),

  hasBirthdayToday: computed('birthday', function() {
    const birthdayDate = moment(this.get('birthday'));

    const monthIsTheSame = moment().month() === birthdayDate.month();
    const dayOfMonthIsTheSame = moment().date() === birthdayDate.date();

    return monthIsTheSame && dayOfMonthIsTheSame;
  }),

  hasPermission(name) {
    return this.get('permissions').findBy('name', name) !== undefined;
  },

  isCurrentUser: computed('session.currentUser.id', 'id', function() {
    return this.get('session').currentUser.id === this.get('id');
  }),

  currentMemberships: computed('memberships', 'memberships.@each.endDate', 'memberships.@each.startDate', function() {
    return this.get('memberships').filter(membership => membership.get('userIsCurrentlyMember'));
  }),

  setNullIfEmptyString(property) {
    const value = this.get(property);
    if (value !== undefined && value !== null && isEmpty(value.trim())) {
      this.set(property, null);
    }
  },

  save(...args) {
    this.setNullIfEmptyString('lastNamePrefix');
    this.setNullIfEmptyString('foodPreferences');
    return this._super(...args);
  }
});
