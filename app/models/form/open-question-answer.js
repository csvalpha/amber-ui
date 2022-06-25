import { belongsTo, attr } from '@ember-data/model';
import DirtySaveModel from 'amber-ui/models/application/dirty-save';

export default class OpenQuestionAnswer extends DirtySaveModel {
  @attr answer;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relations
  @belongsTo('form/open-question') question;
  @belongsTo('form/response') response;

  // Getters
  get completed() {
    return this.response.completed;
  }
}
