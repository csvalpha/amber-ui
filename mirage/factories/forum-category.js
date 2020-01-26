import { Factory, trait } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  name: faker.name.jobArea,
  amountOfThreads: 0,
  withThreads: trait({
    amountOfThreads: 6,
    afterCreate(category, server) {
      category.threads = server.createList('forum-thread', 6, 'withPosts', { category });
    }
  })
});
