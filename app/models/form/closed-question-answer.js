import { alias } from '@ember/object/computed';
import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

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
