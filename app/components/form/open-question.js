import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { OpenQuestionTypes } from 'amber-ui/constants';

const OpenQuestionComponent = Component.extend({
  intl: service(),
  question: null,
  form: null,
  questionTypes: OpenQuestionTypes,
  questionTypeOptions: computed('questionTypes', function () {
    return this.questionTypes.map((questionType) => ({
      value: questionType,
      label: this.intl.t(`tag.input.types.${questionType}`),
    }));
  }),
  actions: {
    moveQuestionUp() {
      const index = this.form.get('sortedQuestions').indexOf(this.question);
      if (index > 0) {
        const previousQuestion = this.form
          .get('sortedQuestions')
          .objectAt(index - 1);
        this.send('switchPositions', this.question, previousQuestion);
      }
    },
    moveQuestionDown() {
      const index = this.form.get('sortedQuestions').indexOf(this.question);
      if (index < this.form.get('sortedQuestions.length') - 1) {
        const nextQuestion = this.form
          .get('sortedQuestions')
          .objectAt(index + 1);
        this.send('switchPositions', this.question, nextQuestion);
      }
    },
    deleteQuestion() {
      this.question.deleteRecord();
    },
    switchPositions(first, second) {
      const firstPosition = first.get('position');
      const secondPosition = second.get('position');

      first.set('position', secondPosition);
      second.set('position', firstPosition);
    },
  },
});

OpenQuestionComponent.reopenClass({
  positionalParams: ['question'],
});

export default OpenQuestionComponent;
