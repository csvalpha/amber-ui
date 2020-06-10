import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { sort, union, gt } from '@ember/object/computed';
import Model, { hasMany, attr } from '@ember-data/model';
import { all } from 'rsvp';

@classic
export default class Form extends Model {
  @attr('date')
  respondFrom;

  @attr('date')
  respondUntil;

  @attr('number')
  amountOfResponses;

  @attr('boolean')
  currentUserResponseCompleted;

  @attr('string')
  currentUserResponseId;

  @attr('date')
  createdAt;

  @attr('date')
  updatedAt;

  // Relations
  @hasMany('form/open-question')
  openQuestions;

  @hasMany('form/closed-question')
  closedQuestions;

  @hasMany('form/response')
  responses;

  // Computed properties
  @gt('amountOfResponses', 0)
  hasResponses;

  @union('openQuestions', 'closedQuestions')
  questions;

  questionsSorting = ['position'];

  @sort('questions', 'questionsSorting')
  sortedQuestions;

  @computed('canRespond', 'currentUserResponseCompleted')
  get currentUserCanRespond() {
    return !this.currentUserResponseCompleted && this.canRespond;
  }

  @computed('respondFrom', 'respondTo', 'respondUntil')
  get canRespond() {
    const now = moment();
    const respondFrom = moment(this.respondFrom);
    const respondUntil = moment(this.respondUntil);

    return now.isAfter(respondFrom) && now.isBefore(respondUntil);
  }

  @computed('respondFrom', 'respondTo')
  get opensLater() {
    const now = moment();
    const respondFrom = moment(this.respondFrom);

    return now.isBefore(respondFrom);
  }

  // Methods
  saveWithQuestions() {
    return this.save().then(form => {
      const questionSavePromises = form.get('openQuestions').map(question => question.save());
      questionSavePromises.pushObjects(form.get('closedQuestions').map(question => question.saveWithOptions()));

      return all(questionSavePromises).then(() => {
        return form;
      });
    });
  }

  rollbackAttributesAndQuestions() {
    this.openQuestions.forEach(openQuestion => {
      openQuestion.rollbackAttributes();
    });
    this.closedQuestions.forEach(closedQuestion => {
      closedQuestion.rollbackAttributesAndOptions();
    });
    this.rollbackAttributes();
  }
}
