import Model, { hasMany, belongsTo, attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  question: attr('string'),
  fieldType: attr('string'),
  position: attr('number'),
  required: attr('boolean'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  isOpenQuestion: true,

  // Relations
  form: belongsTo('form/form'),
  answers: hasMany('form/open-question-answer'),

  // Computed properties
  sumOfAnswers: computed('answers.@each.{answer,completed}', 'fieldType', function() {
    if (this.fieldType === 'number') {
      const answers = this.answers.filterBy('completed', true);
      return answers.mapBy('answer').reduce((a, b) => {
        return parseFloat(a) + parseFloat(b);
      }, 0);
    }

    return null;
  })
});
