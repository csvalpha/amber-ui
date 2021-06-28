import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { all } from 'rsvp';

export default class ClosedQuestion extends Model {
  @attr question;
  @attr fieldType;
  @attr position;
  @attr required;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relations
  @belongsTo('form/form') form;

  @hasMany('form/closed-question-option') options;

  // Getters
  isOpenQuestion = false;

  get isMultipleChoice() {
    return this.fieldType === 'checkbox';
  }

  get sortedOptions() {
    return this.options.sortBy('position');
  }

  // Methods
  saveWithOptions() {
    return this.save().then(closedQuestion => {
      const optionSavePromises = closedQuestion.options.map(option => option.save());
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
