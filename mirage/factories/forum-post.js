import { Factory } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  message: () => faker.lorem.paragraph(),
  messageCamofied: () => faker.lorem.paragraph(),
  createdAt: () => faker.date.recent(),

  afterCreate(post, server) {
    post.author = server.create('user');
    post.save();
  }
});
