import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import DS from 'ember-data';
import checkIfUserIsOwnerMixin from 'alpha-amber/mixins/check-if-user-is-owner-mixin';

const { Model, attr, belongsTo } = DS;

export default Model.extend(checkIfUserIsOwnerMixin, {
  // Attributes
  createdAt: attr('date'),
  updatedAt: attr('date'),

  // Relations
  author: belongsTo('user'),
  form: belongsTo('form/form'),

  // Computed properties
  question: computed('form.closedQuestions.firstObject', function() {
    return this.get('form.closedQuestions.firstObject');
  }),

  currentUserCanRespond: alias('form.currentUserCanRespond'),
  currentUserResponseCompleted: alias('form.currentUserResponseCompleted'),
  closesLater: computed('form.respondUntil', function() {
    return moment().isBefore(this.get('form.respondUntil'));
  }),
  opensLater: computed('form.respondFrom', function() {
    return moment().isBefore(this.get('form.respondFrom'));
  }),
  closedWithNoResponses: computed('form.respondUntil', 'form.amountOfResponses', function() {
    return moment().isAfter(this.get('form.respondUntil')) && this.get('form.amountOfResponses') === 0;
  }),

  saveWithForm() {
    // Every day fun with triple nested promises
    return this.form.then(form => {
      if (!isNone(form)) {
        return form.saveWithQuestions().then(() => {
          return this.save();
        });
      }
      return this.save();
    });
  },
  rollbackAttributesAndForm() {
    this.rollbackAttributes();
    this.form.then(form => {
      if (!isNone(form)) {
        form.rollbackAttributesAndQuestions();
      }
    });
  }
});
