import { Factory } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  content: () => faker.lorem.sentence(),
  book: () => faker.random.number(250),
  chapter: () => faker.random.number(250),
  verse: () => faker.random.number(250)
});
