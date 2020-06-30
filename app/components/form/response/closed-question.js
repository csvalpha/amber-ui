import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';

export const ClosedQuestionBaseComponent = Component.extend({
  question: null,
  options: computed('question.sortedOptions.@each.option', function() {
    return this.get('question.sortedOptions').map(option => {
      return {
        label: option.get('option'),
        value: option.id
      };
    });
  }),
  inputIdentifier: computed('question.id', function() {
    return `question-${this.get('question.id')}`;
  })
});

const ClosedQuestionComponent = ClosedQuestionBaseComponent.extend({
  answer: null,
  errors: alias('answer.errors'),
  selectedOptionId: computed('answer.option.id', {
    get() {
      return this.get('answer.option.id');
    },
    set(key, value) {
      const option = this.get('question.options').findBy('id', value);
      this.answer.set('option', option);
      return value;
    }
  })
});

ClosedQuestionComponent.reopenClass({
  positionalParams: ['question', 'answer']
});

export default ClosedQuestionComponent;
