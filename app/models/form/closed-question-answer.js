import Model, { belongsTo, attr } from '@ember-data/model';

export default class ClosedQuestionAnswer extends Model {
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relations
  @belongsTo('form/closed-question-option') option;
  @belongsTo('form/response') response;

  // Getters
  get question() {
    return this.option.question;
  }
}
