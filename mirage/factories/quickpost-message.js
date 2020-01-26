import { Factory } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  message: faker.lorem.sentence,
  createdAt: () => faker.date.between('2016-04-20', '2016-04-25')
});
