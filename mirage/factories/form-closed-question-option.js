import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  option: () => faker.lorem.sentence(),
  position: () => faker.random.number()
});
