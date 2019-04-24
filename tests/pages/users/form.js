import {
  fillable,
  clickable
} from 'ember-cli-page-object';
import checkbox from 'alpha-amber/tests/pages/helpers/checkbox';
import fillableDate from 'alpha-amber/tests/pages/helpers/fillable-date';

export default {
  address: fillable('input#user-form-address'),
  foodPreferences: fillable('input#user-form-foodPreferences'),
  almanakSubscriptionPreference: fillable('select#user-form-almanakSubscriptionPreference'),
  birthday: fillableDate('input#user-form-birthday', 'fillInBirthdayValue'),
  city: fillable('input#user-form-city'),
  digtusSubscriptionPreference: fillable('select#user-form-digtusSubscriptionPreference'),
  email: fillable('input#user-form-email'),
  emergencyContact: fillable('input#user-form-emergencyContact'),
  emergencyNumber: fillable('input#user-form-emergencyNumber'),
  loginEnabled: checkbox('input#user-form-loginEnabled'),
  fillInBirthdayValue: fillable('input#user-form-birthday'),
  fillInStartStudy: fillable('input#user-form-startStudy'),
  firstName: fillable('input#user-form-firstName'),
  lastName: fillable('input#user-form-lastName'),
  lastNamePrefix: fillable('input#user-form-lastNamePrefix'),
  phoneNumber: fillable('input#user-form-phoneNumber'),
  postcode: fillable('input#user-form-postcode'),
  startStudy: fillableDate('input#user-form-startStudy', 'fillInStartStudy'),
  study: fillable('input#user-form-study'),
  username: fillable('input#user-form-username'),

  fillIn(values) {
    return this
      .address(values.address)
      .foodPreferences(values.foodPreferences)
      .almanakSubscriptionPreference(values.almanakSubscriptionPreference)
      .birthday(values.birthday)
      .city(values.city)
      .digtusSubscriptionPreference(values.digtusSubscriptionPreference)
      .email(values.email)
      .emergencyContact(values.emergencyContact)
      .emergencyNumber(values.emergencyNumber)
      .loginEnabled(values.loginEnabled)
      .firstName(values.firstName)
      .lastName(values.lastName)
      .lastNamePrefix(values.lastNamePrefix)
      .phoneNumber(values.phoneNumber)
      .postcode(values.postcode)
      .startStudy(values.startStudy)
      .study(values.study)
      .username(values.username);
  },

  submit: clickable('input[type=submit]')
};
