import Model, { belongsTo, attr } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default Model.extend({
  createdAt: attr('date'),
  updatedAt: attr('date'),

  // Relations
  option: belongsTo('form/closed-question-option'),
  response: belongsTo('form/response'),

  // Computed properties
  question: alias('option.question'),
  completed: alias('response.completed')
});
