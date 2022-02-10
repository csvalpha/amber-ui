import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default class ClosedQuestionOption extends Model {
  @attr option;
  @attr position;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relations
  @belongsTo('form/closed-question') question;
  @hasMany('form/closed-question-answer') answers;

  // Computed properties
  get sumOfAnswers() {
    return this.answers.map((answer) => answer.get('response.completed'))
      .length;
  }
}
