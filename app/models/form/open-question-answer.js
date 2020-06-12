import Model, { belongsTo, attr } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default Model.extend({
  createdAt: attr('date'),
  updatedAt: attr('date'),
  answer: attr('string'),

  // Relations
  question: belongsTo('form/open-question'),
  response: belongsTo('form/response'),

  // Computed properties
  completed: alias('response.completed')
});
