import { clickable, fillable, value } from 'ember-cli-page-object';
import fillableDate from 'alpha-amber/tests/pages/helpers/fillable-date';

export default {
  address: fillable('input[data-test-input=address]'),
  addressValue: value('input[data-test-input=address]'),
  foodPreferences: fillable('input[data-test-input=foodPreferences]'),
  allergiesValue: value('input[data-test-input=foodPreferences]'),
  almanakSubscriptionPreference: fillable('select[data-test-input=almanakSubscriptionPreference]'),
  almanakSubscriptionPreferenceValue: value('select[data-test-input=almanakSubscriptionPreference]'),
  birthday: fillableDate('input[id*=form-birthday]', 'fillInBirthdayValue'),
  birthdayValue: value('input[id*=form-birthday]'),
  city: fillable('input[data-test-input=city]'),
  cityValue: value('input[data-test-input=city]'),
  digtusSubscriptionPreference: fillable('select[data-test-input=digtusSubscriptionPreference]'),
  digtusSubscriptionPreferenceValue: value('select[data-test-input=digtusSubscriptionPreference]'),
  email: fillable('input[data-test-input=email]'),
  emailValue: value('input[data-test-input=email]'),
  emergencyContact: fillable('input[data-test-input=emergencyContact]'),
  emergencyContactValue: value('input[data-test-input=emergencyContact]'),
  emergencyNumber: fillable('input[data-test-input=emergencyNumber]'),
  emergencyNumberValue: value('input[data-test-input=emergencyNumber]'),
  fillInBirthdayValue: fillable('input#user-form-birthday'),
  fillInStartStudy: fillable('input#user-form-startStudy'),
  firstName: fillable('input[data-test-input=firstName]'),
  firstNameValue: value('input[data-test-input=firstName]'),
  lastName: fillable('input[data-test-input=lastName]'),
  lastNameValue: value('input[data-test-input=lastName]'),
  lastNamePrefix: fillable('input[data-test-input=lastNamePrefix]'),
  lastNamePrefixValue: value('input[data-test-input=lastNamePrefix]'),
  phoneNumber: fillable('input[data-test-input=phoneNumber]'),
  phoneNumberValue: value('input[data-test-input=phoneNumber]'),
  postcode: fillable('input[data-test-input=postcode]'),
  postcodeValue: value('input[data-test-input=postcode]'),
  startStudy: fillableDate('input[id*=form-startStudy]', 'fillInStartStudy'),
  startStudyValue: value('input[id*=form-startStudy]'),
  study: fillable('input[data-test-input=study]'),
  studyValue: value('input[data-test-input=study]'),

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
      .firstName(values.firstName)
      .lastName(values.lastName)
      .lastNamePrefix(values.lastNamePrefix)
      .phoneNumber(values.phoneNumber)
      .postcode(values.postcode)
      .startStudy(values.startStudy)
      .study(values.study);
  },

  submit: clickable('input[type=submit]')
};
