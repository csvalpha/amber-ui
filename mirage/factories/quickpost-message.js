import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  message: faker.lorem.sentence,
  createdAt: () => faker.date.between('2016-04-20', '2016-04-25')
});
