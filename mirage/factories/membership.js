import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  function: faker.name.jobTitle,
  startDate: faker.date.past,
});
