import { sort, union, gt } from '@ember/object/computed';
import Model, { hasMany, attr } from '@ember-data/model';
import { all } from 'rsvp';

export default class Form extends Model {
  @attr respondFrom;
  @attr respondUntil;
  @attr amountOfResponses;
  @attr currentUserResponseCompleted;
  @attr currentUserResponseId;
  @attr createdAt;
  @attr updatedAt;

  // Relations
  @hasMany('form/open-question') openQuestions;
  @hasMany('form/closed-question') closedQuestions;
  @hasMany('form/response') responses;

  // Computed properties

  @gt('amountOfResponses', 0) hasResponses;
  @union('openQuestions', 'closedQuestions') questions;
  questionsSorting = ['position'];
  @sort('questions', 'questionsSorting') sortedQuestions;

  get currentUserCanRespond() {
    return !this.currentUserResponseCompleted && this.canRespond;
  }

  get canRespond() {
    const now = moment();
    const respondFrom = moment(this.respondFrom);
    const respondUntil = moment(this.respondUntil);

    return now.isAfter(respondFrom) && now.isBefore(respondUntil);
  }

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
