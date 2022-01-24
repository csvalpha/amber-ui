import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default class Response extends Model {
  @attr('date') createdAt
  @attr('date') updatedAt
  @attr('boolean') completed

  @belongsTo('form/form') form
  @belongsTo('user') user
  @hasMany('form/open-question-answer') openQuestionAnswers
  @hasMany('form/closed-question-answer') closedQuestionAnswers

  get answers() {
    return Promise.all([this.openQuestionAnswers, this.closedQuestionAnswers])
      .then(answersResults => answersResults.reduce((result, answersResult) => {
        result.push(...answersResult.toArray());
        return result;
      }, []));
  }

  get groupedAnswers() {
    // For the id of the question, we have to wait until the answers are actually loaded.
    // Furthermore, for the closed question answers we have to wait until the linked options are loaded
    // (the question is linked to the answer through the option).
    return this.answers
      .then(async answers => {
        await Promise.all(this.closedQuestionAnswers.then(closedQuestionAnswers => (
          closedQuestionAnswers.toArray().map(closedQuestionAnswer => closedQuestionAnswer.option)
        )));
        return answers;
      })
      .then(this.groupAnswers);
  }

  get userFullName() {
    return this.user.fullName;
  }

  groupAnswers(answers) {
    return answers.reduce((result, answer) => {
      const questionId = answer.question.id;
      if (questionId) {
        if (!result.includes(questionId)) {
          result[questionId] = [];
        }

        result[questionId].push(answer);
        return result;
      }
    }, []);
  }

  async saveWithAnswers() {
    const response = await this.saveIfDirty();
    const answerPromises = (await response.answers)
      .filter(async answer => (await answer.option)?.option || answer.answer || (await answer.question)?.required)
      .map(answer => answer.saveIfDirty());
    await Promise.all(answerPromises);
    return response;
  }

  rollbackAttributesAndAnswers() {
    [this, ...this.answers].forEach(model => model.rollbackAttributes());
  }
}
