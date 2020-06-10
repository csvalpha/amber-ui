import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

@classic
export default class OpenQuestion extends Model {
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

  isOpenQuestion = true;

  // Relations
  @belongsTo('form/form')
  form;

  @hasMany('form/open-question-answer')
  answers;

  // Computed properties
  @computed('answers.@each.{answer,completed}', 'fieldType')
  get sumOfAnswers() {
    if (this.fieldType === 'number') {
      const answers = this.answers.filterBy('completed', true);
      return answers.mapBy('answer').reduce((a, b) => {
        return parseFloat(a) + parseFloat(b);
      }, 0);
    }

    return null;
  }
}
