import Model, { hasMany, belongsTo, attr } from '@ember-data/model';
import { alias, union } from '@ember/object/computed';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { all } from 'rsvp';

export default Model.extend({
  createdAt: attr('date'),
  updatedAt: attr('date'),
  completed: attr('boolean'),

  // Relations
  form: belongsTo('form/form'),
  user: belongsTo('user'),
  openQuestionAnswers: hasMany('form/open-question-answer'),
  closedQuestionAnswers: hasMany('form/closed-question-answer'),

  // Computed properties
  userFullName: alias('user.fullName'),
  answers: union('openQuestionAnswers', 'closedQuestionAnswers'),
  groupedAnswersPromise: computed('answers', 'closedQuestionAnswers.[]', 'openQuestionAnswers.[]', function() {
    // For the id of the question, we have to wait until the answers are actually loaded
    // Furthermore, for the closed question answers we have to wait until the linked options are loaded
    // (the question is linked to the answer through the option)
    return all([
      this.openQuestionAnswers,
      this.closedQuestionAnswers
        .then(
          closedQuestionAnswers =>
            all(closedQuestionAnswers.map(closedQuestionAnswer => closedQuestionAnswer.get('option')))
        )
    ]).then(() => {
      const groupedAnswers = this.groupAnswers(this.answers);
      // eslint-disable-next-line ember/no-side-effects
      this.set('groupedAnswers', groupedAnswers);
      return groupedAnswers;
    });
  }),
  _groupedAnswers: A(),
  groupedAnswers: computed('_groupedAnswers', 'groupedAnswersPromise', {
    get() {
      // Lazy loading: only load answers when requested
      this.groupedAnswersPromise;
      return this._groupedAnswers;
    },
    set(key, value) {
      this.set('_groupedAnswers', value);
      return value;
    }
  }),

  // Groups answers on question id
  groupAnswers(answers) {
    const result = A();

    answers.forEach(answer => {
      const questionId = answer.get('question.id');
      if (questionId) {
        if (!result.get(questionId)) {
          result.set(questionId, A());
        }

        result.get(questionId).push(answer);
      }
    });

    return result;
  },
  saveWithAnswers() {
    return this.saveIfDirty().then(response => {
      const answerPromises = response.get('answers')
      // Only save answers which have a selected option, given answer or are required
        .filter(answer => answer.get('option.option') || answer.get('answer') || answer.get('question.required'))
        .map(answer => answer.saveIfDirty());
      return all(answerPromises).then(() => response);
    });
  },
  rollbackAttributesAndAnswers() {
    this.answers.forEach(answer => answer.rollbackAttributes());
    this.rollbackAttributes();
  }
});
