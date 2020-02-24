import { Factory } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  answer() {
    return this.question.attrs.fieldType === 'number' ? faker.random.number() : faker.lorem.sentence();
  }
});
