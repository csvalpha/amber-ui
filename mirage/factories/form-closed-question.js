import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  question: faker.lorem.sentence,
  fieldType: () => faker.helpers.arrayElement(['radio', 'checkbox']),
  position: faker.datatype.number,
  required: faker.datatype.boolean,
  _optionCount: 4,
  afterCreate(question, server) {
    question.options = server.createList(
      'formClosedQuestionOption',
      question._optionCount,
      { question }
    );
  },
});
