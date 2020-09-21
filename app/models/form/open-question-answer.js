import { alias } from '@ember/object/computed';
import Model, { belongsTo, attr } from '@ember-data/model';

export default class OpenQuestionAnswer extends Model {
  @attr answer;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relations
  @belongsTo('form/open-question') question;
  @belongsTo('form/response') response;

  // Getters
  @alias('response.completed') completed;
}
