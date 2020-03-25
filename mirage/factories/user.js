import { Factory } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  activatedAt: () => faker.date.past(10),
  address: () => faker.address.streetAddress(),
  foodPreferences: () => faker.random.arrayElement([null, 'pinda\'s', 'noten', 'lactose']),
  avatarThumbUrl: '/images/fallback/avatar_thumb_default.png',
  birthday: () => faker.date.past(20, moment().subtract(18, 'years').format('YYYY-MM-DD')),
  city: () => faker.address.city(),
  email: () => faker.internet.email(),
  emergencyContact: () => faker.name.firstName(),
  emergencyNumber: () => faker.phone.phoneNumber(),
  loginEnabled: () => faker.random.boolean(),
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  lastNamePrefix: () => faker.random.arrayElement([null, 'van', 'der', 'van de']),
  phoneNumber: () => faker.phone.phoneNumber(),
  postcode: () => faker.address.zipCode(),
  startStudy: () => faker.date.past(10),
  study: () => faker.name.jobArea(),
  username: () => faker.internet.userName(),

  almanakSubscriptionPreference: () => faker.random.arrayElement(['no_subscription', 'digital', 'physical']),
  digtusSubscriptionPreference: () => faker.random.arrayElement(['no_subscription', 'digital', 'physical']),
  picturePublicationPreference: () => faker.random.arrayElement(['always_publish', 'always_ask', 'never_publish']),
  ifesDataSharingPreference: () => faker.random.boolean(),
  infoInAlmanak: () => faker.random.boolean(),
  userDetailsSharingPreference: () => faker.random.arrayElement(['hidden', 'members_only', 'all_users']),

  createdAt: () => faker.date.past(10),
  updatedAt: () => faker.date.past(10)
});
