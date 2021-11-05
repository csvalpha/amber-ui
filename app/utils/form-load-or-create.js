import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import { hash } from 'rsvp';

export default class FormLoadOrCreateUtil {
  constructor(entity) {
    this.entity = entity;
  }

  loadOrCreateCurrentUserResponse(form) {
    const currentUserResponseId = form.get('currentUserResponseId');

    if (currentUserResponseId) {
      return this.entity.store.findRecord('form/response', currentUserResponseId);
    }

    const user = this.entity.session.get('currentUser');
    return this.entity.store.createRecord('form/response', { form, user });
  }

  loadOrCreateAnswers(response) {
    return response.get('form').then(form => {
      return hash({
        // First promise: We request the existing answers in the response, grouped by question id
        groupedAnswers: response.get('groupedAnswersPromise'),
        // Second promise: To determine the type of the questions, the questions have to be loaded
        openQuestions: form.get('openQuestions'),
        closedQuestions: form.get('closedQuestions')
      }).then(({ groupedAnswers, openQuestions, closedQuestions }) => {
        openQuestions.forEach(question => {
          const questionId = question.get('id');
          const existingAnswers = isNone(groupedAnswers) ? null : groupedAnswers.get(questionId);
          const answerExist = !isNone(existingAnswers) && existingAnswers.get('length') > 0;

          if (answerExist) {
            question.set('linkedAnswer', existingAnswers.get('firstObject'));
          } else {
            question.set('linkedAnswer', this.entity.store.createRecord('form/open-question-answer', { response, question }));
          }
        });

        closedQuestions.forEach(question => {
          const questionId = question.get('id');
          const existingAnswers = isNone(groupedAnswers) ? null : groupedAnswers.get(questionId);
          const answerExist = !isNone(existingAnswers) && existingAnswers.get('length') > 0;

          if (question.get('isMultipleChoice')) {
            if (answerExist) {
              question.set('linkedAnswers', existingAnswers);
            } else {
              question.set('linkedAnswers', A());
            }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (answerExist) {
              question.set('linkedAnswer', existingAnswers.get('firstObject'));
            } else {
              question.set('linkedAnswer', this.entity.store.createRecord('form/closed-question-answer', { response }));
            }
          }
        });

        // The promise should return the original response
        return response;
      });
    });
  }
}
