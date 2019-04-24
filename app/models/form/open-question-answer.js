import { alias } from '@ember/object/computed';
import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

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
