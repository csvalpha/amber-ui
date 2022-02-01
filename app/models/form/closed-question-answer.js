import { belongsTo, attr } from '@ember-data/model';
import DirtySaveModel from 'alpha-amber/models/application/dirty-save';

export default class ClosedQuestionAnswer extends DirtySaveModel {
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relations
  @belongsTo('form/closed-question-option') option;
  @belongsTo('form/response') response;

  // Getters
  get question() {
    return this.option.then(option => option?.question);
  }
}
