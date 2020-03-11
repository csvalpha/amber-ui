import { Factory } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  question: () => faker.lorem.sentence(),
  fieldType: () => faker.random.arrayElement(['radio', 'checkbox']),
  position: () => faker.random.number(),
  required: () => faker.random.boolean(),
  _optionCount: 4,
  afterCreate(question, server) {
    question.options = server.createList('formClosedQuestionOption', question._optionCount, { question });
  }
});
