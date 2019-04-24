import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  memberships: hasMany(),
  permissions: hasMany(),
  fullName() {
    if (this.lastNamePrefix) {
      return `${this.firstName} ${this.lastNamePrefix} ${this.lastName}`;
    }
    return `${this.firstName} ${this.lastName}`;
  }
});

export const publicPropertyNames = [
  'fullName',
  'email',
  'address',
  'postcode',
  'phoneNumber',
  'city',
  'birthday',
  'foodPreferences',
  'vegetarian',
  'study',
  'startStudy',
  'picturePublicationPreference'
];

export const protectedPropertyNames = [
  'id',
  'username',
  'loginEnabled',
  'activatedAt'
];
