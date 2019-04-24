import { Factory, faker } from 'ember-cli-mirage';

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
