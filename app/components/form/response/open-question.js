import Component from '@ember/component';
import { computed } from '@ember/object';

const OpenQuestionComponent = Component.extend({
  inputIdentifier: computed('question.id', function () {
    return `question-${this.question.id}`;
  }),
});

OpenQuestionComponent.reopenClass({
  positionalParams: ['question', 'answer'],
});

export default OpenQuestionComponent;
