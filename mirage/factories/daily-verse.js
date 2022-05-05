import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  content: faker.lorem.sentence,
  book: () => faker.datatype.number(250),
  chapter: () => faker.datatype.number(250),
  verse: () => faker.datatype.number(250),
});
