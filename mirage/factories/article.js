import { Factory } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  title: () => faker.lorem.sentence(),
  excerpt: () => faker.lorem.paragraph(),
  content: () => faker.lorem.paragraph(),
  contentCamofied: () => faker.lorem.paragraph(),
  afterCreate(article, server) {
    article.author = server.create('user');
    article.save();
  }
});
