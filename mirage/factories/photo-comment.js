import { Factory } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  content: faker.lorem.paragraph,
  updatedAt: () => faker.date.recent(1),
  createdAt: () => faker.date.recent(14)
});
