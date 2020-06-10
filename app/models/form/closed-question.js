import classic from 'ember-classic-decorator';
import { sort, equal } from '@ember/object/computed';
import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { all } from 'rsvp';

@classic
export default class ClosedQuestion extends Model {
  @attr('string')
  question;

  @attr('string')
  fieldType;

  @attr('number')
  position;

  @attr('boolean')
  required;

  @attr('date')
  createdAt;

  @attr('date')
  updatedAt;

  // Computed properties
  isOpenQuestion = false;

  @equal('fieldType', 'checkbox')
  isMultipleChoice;

  optionsSorting = ['position'];

  @sort('options', 'optionsSorting')
  sortedOptions;

  // Relations
  @belongsTo('form/form')
  form;

  @hasMany('form/closed-question-option')
  options;

  // Methods
  saveWithOptions() {
    return this.save().then(closedQuestion => {
      const optionSavePromises = closedQuestion.get('options').map(option => option.save());
      return all(optionSavePromises).then(() => {
        return closedQuestion;
      });
    });
  }

  rollbackAttributesAndOptions() {
    this.options.forEach(option => {
      option.rollbackAttributes();
    });
    this.rollbackAttributes();
  }
}
