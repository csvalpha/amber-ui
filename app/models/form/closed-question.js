import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { equal, sort } from '@ember/object/computed';
import { all } from 'rsvp';

export default Model.extend({
  question: attr('string'),
  fieldType: attr('string'),
  position: attr('number'),
  required: attr('boolean'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  // Computed properties
  isOpenQuestion: false,
  isMultipleChoice: equal('fieldType', 'checkbox'),
  optionsSorting: ['position'],
  sortedOptions: sort('options', 'optionsSorting'),

  // Relations
  form: belongsTo('form/form'),
  options: hasMany('form/closed-question-option'),

  // Methods
  saveWithOptions() {
    return this.save().then(closedQuestion => {
      const optionSavePromises = closedQuestion.get('options').map(option => option.save());
      return all(optionSavePromises).then(() => {
        return closedQuestion;
      });
    });
  },
  rollbackAttributesAndOptions() {
    this.options.forEach(option => {
      option.rollbackAttributes();
    });
    this.rollbackAttributes();
  }
});
