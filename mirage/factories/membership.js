import { Factory } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  function: faker.name.jobTitle,
  startDate: faker.date.past,
});
