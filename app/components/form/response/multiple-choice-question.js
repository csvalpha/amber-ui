import { mapBy } from '@ember/object/computed';
import { computed } from '@ember/object';
import { ClosedQuestionBaseComponent } from './closed-question';

const MultipleChoiceQuestionComponent = ClosedQuestionBaseComponent.extend({
  answers: null,
  selectedOptionIds: mapBy('answers', 'option.id'),
  requiredAndNothingSelected: computed('question.required', 'selectedOptionIds.length', function() {
    return this.question.required && this.selectedOptionIds.length === 0;
  })
});

MultipleChoiceQuestionComponent.reopenClass({
  positionalParams: ['question', 'answers']
});

export default MultipleChoiceQuestionComponent;
