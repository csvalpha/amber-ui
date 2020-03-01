import { Factory } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  question: () => faker.lorem.sentence(),
  fieldType: () => faker.random.arrayElement([
    'number',
    'text',
    'textarea'
  ]),
  position: () => faker.random.number(),
  required: () => faker.random.boolean()
});
