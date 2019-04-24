import {
  create,
  visitable,
  text
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/users/:id'),
  fullName: text('[data-test-fullName]'),
  email: text('[data-test-email]'),
  phoneNumber: text('[data-test-phoneNumber]'),
  address: text('[data-test-address]'),
  postcode: text('[data-test-postcode]'),
  city: text('[data-test-city]'),
  birthday: text('[data-test-birthday]'),
  study: text('[data-test-study]'),
  startStudy: text('[data-test-startStudy]'),
  foodPreferences: text('[data-test-foodPreferences]'),
  vegetarian: text('[data-test-vegetarian]')
});
