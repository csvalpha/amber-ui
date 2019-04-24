import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  content: faker.lorem.paragraph,
  updatedAt: () => faker.date.recent(1),
  createdAt: () => faker.date.recent(14)
});
