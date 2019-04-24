import { faker } from 'ember-cli-mirage';
import { registerHelper } from '@ember/test';

/** A helper for creating random answers to all questions in the form. */
export default registerHelper('generateFormAnswers', (app, form) => {
  const openQuestions = form.openQuestions.models;
  const closedQuestions = form.closedQuestions.models;

  // Generate some answers
  const answers = {
    open: {},
    closed: {}
  };

  openQuestions.forEach(question => {
    answers.open[question.id] = server.build('form-open-question-answer', { question });
  });
  closedQuestions.forEach(question => {
    const option = faker.random.arrayElement(question.options.models);
    answers.closed[question.id] = server.build('form-closed-question-answer', { option });
  });

  return answers;
});
