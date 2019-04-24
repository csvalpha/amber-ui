import { computed } from '@ember/object';
import DS from 'ember-data';

const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  option: attr('string'),
  position: attr('number'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  // Relations
  question: belongsTo('form/closed-question'),
  answers: hasMany('form/closed-question-answer'),

  // Computed properties
  sumOfAnswers: computed('answers', 'answers.@each.completed', function() {
    return this.get('answers').filterBy('completed', true).length;
  })
});
