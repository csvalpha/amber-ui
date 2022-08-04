import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  question: faker.lorem.sentence,
  fieldType: () => faker.helpers.arrayElement(['number', 'text', 'textarea']),
  position: faker.datatype.number,
  required: faker.datatype.boolean,
});
