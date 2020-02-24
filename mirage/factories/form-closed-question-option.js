import { Factory } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  option: () => faker.lorem.sentence(),
  position: () => faker.random.number()
});
