import { hasMany, belongsTo, attr } from '@ember-data/model';
import DirtySaveModel from 'amber-ui/models/application/dirty-save';

export default class Response extends DirtySaveModel {
  @attr('date') createdAt;
  @attr('date') updatedAt;
  @attr('boolean') completed;

  @belongsTo('form/form') form;
  @belongsTo('user') user;
  @hasMany('form/open-question-answer') openQuestionAnswers;
  @hasMany('form/closed-question-answer') closedQuestionAnswers;

  get answersPromise() {
    return Promise.all([
      this.openQuestionAnswers,
      this.closedQuestionAnswers,
    ]).then(([openQuestionAnswers, closedQuestionAnswers]) => [
      ...openQuestionAnswers.toArray(),
      ...closedQuestionAnswers.toArray(),
    ]);
  }

  get groupedAnswersPromise() {
    // For the id of the question, we have to wait until the answers are actually loaded.
    // Furthermore, for the closed question answers we have to wait until the linked options are loaded
    // (the question is linked to the answer through the option).
    return this.answersPromise
      .then(async (answers) => {
        await Promise.all(
          (
            await this.closedQuestionAnswers
          ).map((closedQuestionAnswer) => closedQuestionAnswer.option)
        );
        return answers;
      })
      .then(this.groupAnswers);
  }

  get userFullName() {
    return this.user.then((user) => user.fullName);
  }

  groupAnswers(answers) {
    return answers.reduce(async (resultPromise, answer) => {
      const result = await resultPromise;
      const questionId = (await answer.question)?.id;
      if (questionId) {
        result[questionId] ??= [];
        result[questionId].push(answer);
      }

      return result;
    }, []);
  }

  async saveWithAnswers() {
    const response = await this.saveIfDirty();
    const answers = await response.answersPromise;
    await Promise.all(
      answers.map(async (answer) => {
        if (
          (await answer.option)?.option ||
          answer.answer ||
          (await answer.question)?.required
        ) {
          return answer.saveIfDirty();
        }
      })
    );
    return response;
  }

  async rollbackAttributesAndAnswers() {
    [this, ...(await this.answersPromise)].forEach((model) =>
      model.rollbackAttributes()
    );
  }
}
