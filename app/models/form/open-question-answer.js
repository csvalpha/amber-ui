import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import Model, { belongsTo, attr } from '@ember-data/model';

@classic
export default class OpenQuestionAnswer extends Model {
  @attr('date')
  createdAt;

  @attr('date')
  updatedAt;

  @attr('string')
  answer;

  // Relations
  @belongsTo('form/open-question')
  question;

  @belongsTo('form/response')
  response;

  // Computed properties
  @alias('response.completed')
  completed;
}
