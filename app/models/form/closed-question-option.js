import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

@classic
export default class ClosedQuestionOption extends Model {
  @attr('string')
  option;

  @attr('number')
  position;

  @attr('date')
  createdAt;

  @attr('date')
  updatedAt;

  // Relations
  @belongsTo('form/closed-question')
  question;

  @hasMany('form/closed-question-answer')
  answers;

  // Computed properties
  @computed('answers', 'answers.@each.completed')
  get sumOfAnswers() {
    return this.answers.filterBy('completed', true).length;
  }
}
