import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  answer() {
    return this.question.attrs.fieldType === 'number' ? faker.random.number() : faker.lorem.sentence();
  }
});
