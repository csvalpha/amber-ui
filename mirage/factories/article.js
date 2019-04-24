import { Factory, faker } from 'ember-cli-mirage';

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
