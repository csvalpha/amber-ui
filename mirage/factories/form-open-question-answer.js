import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  answer() {
    return this.question.attrs.fieldType === 'number'
      ? faker.datatype.number()
      : faker.lorem.sentence();
  },
});
