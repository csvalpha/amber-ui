import { Factory, trait } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  title: faker.lorem.sentence,
  description: faker.lorem.sentence,
  descriptionCamofied: faker.lorem.paragraph,
  price: () => faker.datatype.number(25000) / 100,
  location: faker.address.streetAddress,
  coverPhotoUrl: null,
  createdAt: faker.date.recent,
  startTime: faker.date.future,
  endTime: faker.date.future,
  category: () =>
    faker.helpers.arrayElement([
      'algemeen',
      'sociëteit',
      'vorming',
      'dinsdagkring',
      'woensdagkring',
      'choose',
      'ifes',
      'ozon',
      'disputen',
      'kiemgroepen',
      'huizen',
      'extern',
      'curiositates',
    ]),

  afterCreate(activity, server) {
    activity.author = server.create('user');
    activity.save();
  },

  onBehalfOfGroup: trait({
    afterCreate(activity, server) {
      activity.group = server.create('group');
      activity.save();
    },
  }),

  withForm: trait({
    afterCreate(activity, server) {
      activity.form = server.create('form-form', 'withQuestions');
      activity.save();
    },
  }),
});
