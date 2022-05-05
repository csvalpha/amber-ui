import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  activatedAt: () => faker.date.past(10),
  address: faker.address.streetAddress,
  foodPreferences: () =>
    faker.helpers.arrayElement([null, "pinda's", 'noten', 'lactose']),
  avatarThumbUrl: '/images/fallback/avatar_thumb_default.png',
  birthday: () =>
    faker.date
      .birthdate({ min: 18, max: 38 })
      .toLocaleDateString('nl')
      .replace(/\//g, '-'),
  city: faker.address.city,
  email: faker.internet.email,
  emergencyContact: faker.name.firstName,
  emergencyNumber: faker.phone.number,
  loginEnabled: faker.datatype.boolean,
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  lastNamePrefix: () =>
    faker.helpers.arrayElement([null, 'van', 'der', 'van de']),
  nickname: faker.name.firstName,
  phoneNumber: faker.phone.number,
  postcode: faker.address.zipCode,
  startStudy: () => faker.date.past(10),
  study: faker.name.jobArea,
  username: faker.internet.userName,

  almanakSubscriptionPreference: () =>
    faker.helpers.arrayElement(['no_subscription', 'digital', 'physical']),
  digtusSubscriptionPreference: () =>
    faker.helpers.arrayElement(['no_subscription', 'digital', 'physical']),
  picturePublicationPreference: () =>
    faker.helpers.arrayElement([
      'always_publish',
      'always_ask',
      'never_publish',
    ]),
  ifesDataSharingPreference: faker.datatype.boolean,
  infoInAlmanak: faker.datatype.boolean,
  userDetailsSharingPreference: () =>
    faker.helpers.arrayElement(['hidden', 'members_only', 'all_users']),

  createdAt: () => faker.date.past(10),
  updatedAt: () => faker.date.past(10),
});
