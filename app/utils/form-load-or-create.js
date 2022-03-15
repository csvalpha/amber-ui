import { isNone } from '@ember/utils';

export default class FormLoadOrCreateUtil {
  constructor(entity) {
    this.entity = entity;
  }

  loadOrCreateCurrentUserResponse(form) {
    const { currentUserResponseId } = form;
    if (currentUserResponseId) {
      return this.entity.store.findRecord(
        'form/response',
        currentUserResponseId
      );
    }

    const user = this.entity.session.currentUser;
    return this.entity.store.createRecord('form/response', { form, user });
  }

  async loadOrCreateAnswers(response) {
    const form = await response.form;
    const [groupedAnswers, openQuestions, closedQuestions] = await Promise.all([
      response.groupedAnswersPromise,
      form.openQuestions,
      form.closedQuestions,
    ]);

    openQuestions.forEach((question) => {
      const questionId = question.id;
      const existingAnswers = isNone(groupedAnswers)
        ? null
        : groupedAnswers[questionId];
      const answerExist =
        !isNone(existingAnswers) && existingAnswers.length > 0;

      if (answerExist) {
        question.linkedAnswer = existingAnswers[0];
      } else {
        question.linkedAnswer = this.entity.store.createRecord(
          'form/open-question-answer',
          { response, question }
        );
      }
    });

    closedQuestions.forEach((question) => {
      const questionId = question.id;
      const existingAnswers = isNone(groupedAnswers)
        ? null
        : groupedAnswers[questionId];
      const answerExist =
        !isNone(existingAnswers) && existingAnswers.length > 0;

      if (question.isMultipleChoice) {
        if (answerExist) {
          question.linkedAnswers = existingAnswers;
        } else {
          question.linkedAnswers = [];
        }
      } else {
        if (answerExist) {
          question.linkedAnswer = existingAnswers[0];
        } else {
          question.linkedAnswer = this.entity.store.createRecord(
            'form/closed-question-answer',
            { response }
          );
        }
      }
    });

    return response;
  }
}
