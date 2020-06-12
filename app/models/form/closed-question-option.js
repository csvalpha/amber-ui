import Model, { hasMany, belongsTo, attr } from '@ember-data/model';
import { computed } from '@ember/object';

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
    return this.answers.filterBy('completed', true).length;
  })
});
