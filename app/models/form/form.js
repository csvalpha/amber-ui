import { gt, union, sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import { all } from 'rsvp';
import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  respondFrom: attr('date'),
  respondUntil: attr('date'),
  amountOfResponses: attr('number'),
  currentUserResponseCompleted: attr('boolean'),
  currentUserResponseId: attr('string'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  // Relations
  openQuestions: hasMany('form/open-question'),
  closedQuestions: hasMany('form/closed-question'),
  responses: hasMany('form/response'),

  // Computed properties
  hasResponses: gt('amountOfResponses', 0),
  questions: union('openQuestions', 'closedQuestions'),
  questionsSorting: ['position'],
  sortedQuestions: sort('questions', 'questionsSorting'),
  currentUserCanRespond: computed('canRespond', 'currentUserResponseCompleted', function() {
    return !this.get('currentUserResponseCompleted') && this.get('canRespond');
  }),
  canRespond: computed('respondFrom', 'respondTo', function() {
    const now = moment();
    const respondFrom = moment(this.get('respondFrom'));
    const respondUntil = moment(this.get('respondUntil'));

    return now.isAfter(respondFrom) && now.isBefore(respondUntil);
  }),
  opensLater: computed('respondFrom', 'respondTo', function() {
    const now = moment();
    const respondFrom = moment(this.get('respondFrom'));

    return now.isBefore(respondFrom);
  }),

  // Methods
  saveWithQuestions() {
    return this.save().then(form => {
      const questionSavePromises = form.get('openQuestions').map(question => question.save());
      questionSavePromises.pushObjects(form.get('closedQuestions').map(question => question.saveWithOptions()));

      return all(questionSavePromises).then(() => {
        return form;
      });
    });
  },
  rollbackAttributesAndQuestions() {
    this.get('openQuestions').forEach(openQuestion => {
      openQuestion.rollbackAttributes();
    });
    this.get('closedQuestions').forEach(closedQuestion => {
      closedQuestion.rollbackAttributesAndOptions();
    });
    this.rollbackAttributes();
  }
});
