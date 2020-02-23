import { Factory, trait } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  title: () => faker.lorem.sentence(),
  amountOfPosts: 0,
  createdAt: () => faker.date.recent(10),
  updatedAt: () => faker.date.recent(),
  closedAt: null,

  afterCreate(thread, server) {
    thread.author = server.create('user');
    thread.save();
  },

  withCategory: trait({
    afterCreate(thread, server) {
      thread.category = server.create('forum-category');
    }
  }),

  withPosts: trait({
    amountOfPosts: 4,
    afterCreate(thread, server) {
      thread.posts = server.createList('forum-post', 4, { thread });
    }
  })
});
