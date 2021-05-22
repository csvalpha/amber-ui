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
        this.send('addClosedQuestionOption', question)
      }
    },
    addOpenQuestion() {
      this.send('createQuestion', 'form/open-question', 'text');
    },
    addClosedQuestion() {
      this.send('createQuestion', 'form/closed-question', 'radio');
    },
    addClosedQuestionOption(question) {
      const position = question.get('sortedOptions.lastObject.position') + 1 || 0;
      this.store.createRecord('form/closed-question-option', {
        question: question,
        position
      });
    },
  }
});

FormFormComponent.reopenClass({
  positionalParams: ['model']
});

export default FormFormComponent;
