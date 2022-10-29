import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  title: faker.lorem.sentence,
  date: faker.date.recent,
});
