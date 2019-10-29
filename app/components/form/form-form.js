import { inject as service } from '@ember/service';
import Component from '@ember/component';

export const FormFormComponent = Component.extend({
  model: null,
  store: service(),
  actions: {
    createQuestion(modelClass, fieldType) {
      const form = this.model;
      const position = form.get('sortedQuestions.lastObject.position') + 1 || 0;
      const question = this.store.createRecord(modelClass, {
        form,
        fieldType,
        position,
        required: true
      });
      if (!question.get('isOpenQuestion')) {
        this.send('addOption', question);
      }
    },
    addOpenQuestion() {
      this.send('createQuestion', 'form/open-question', 'text');
    },
    addClosedQuestion() {
      this.send('createQuestion', 'form/closed-question', 'radio');
    },
    deleteQuestion(question) {
      question.deleteRecord();
    },
    addOption(question) {
      const position = question.get('sortedOptions.lastObject.position') + 1 || 0;
      this.store.createRecord('form/closed-question-option', {
        question,
        position
      });
    },
    deleteOption(option) {
      option.deleteRecord();
    },
    moveQuestionUp(question) {
      const form = this.model;
      const index = form.get('sortedQuestions').indexOf(question);
      if (index > 0) {
        const previousQuestion = form.get('sortedQuestions').objectAt(index - 1);
        this.send('switchPositions', question, previousQuestion);
      }
    },
    moveQuestionDown(question) {
      const form = this.model;
      const index = form.get('sortedQuestions').indexOf(question);
      if (index < (form.get('sortedQuestions.length') - 1)) {
        const nextQuestion = form.get('sortedQuestions').objectAt(index + 1);
        this.send('switchPositions', question, nextQuestion);
      }
    },
    moveOptionUp(option, question) {
      const index = question.get('sortedOptions').indexOf(option);
      if (index > 0) {
        const previousOption = question.get('sortedOptions').objectAt(index - 1);
        this.send('switchPositions', option, previousOption);
      }
    },
    moveOptionDown(option, question) {
      const index = question.get('sortedOptions').indexOf(option);
      if (index < (question.get('sortedOptions.length') - 1)) {
        const nextOption = question.get('sortedOptions').objectAt(index + 1);
        this.send('switchPositions', option, nextOption);
      }
    },
    switchPositions(first, second) {
      const firstPosition = first.get('position');
      const secondPosition = second.get('position');

      first.set('position', secondPosition);
      second.set('position', firstPosition);
    }
  }
});

FormFormComponent.reopenClass({
  positionalParams: ['model']
});

export default FormFormComponent;
