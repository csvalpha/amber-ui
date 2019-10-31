import { mapBy } from '@ember/object/computed';
import { observer, computed } from '@ember/object';
import { ClosedQuestionBaseComponent } from './closed-question';

const MultipleChoiceQuestionComponent = ClosedQuestionBaseComponent.extend({
  answers: null,
  selectedOptionIds: mapBy('answers', 'option.id'),
  selectedOptionIdsObserver: observer('selectedOptionIds.[]', function() {
    this.sendAction('updateAnswers', this.question, this.selectedOptionIds);
  }),
  requiredAndNothingSelected: computed('question.required', 'selectedOptionIds.length', function() {
    return this.get('question.required') && this.get('selectedOptionIds.length') === 0;
  })
});

MultipleChoiceQuestionComponent.reopenClass({
  positionalParams: ['question', 'answers']
});

export default MultipleChoiceQuestionComponent;
