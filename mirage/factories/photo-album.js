import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title: faker.lorem.sentence,
  date: faker.date.recent()
});
