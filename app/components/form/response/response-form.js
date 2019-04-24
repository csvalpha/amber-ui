import { inject as service } from '@ember/service';
import Component from '@ember/component';

const FormResponseComponent = Component.extend({
  store: service(),
  actions: {
    updateMultipleChoiceAnswers(question, optionIds) {
      const response = this.get('response');
      const answers = question.get('linkedAnswers');
      const previousOptionIds = answers.mapBy('option.id').rejectBy('isDeleted');
      const removedOptionIds = previousOptionIds.reject(id => optionIds.includes(id));
      const addedOptionIds = optionIds.reject(id => previousOptionIds.includes(id));

      removedOptionIds.forEach(removedOptionId => {
        const removedAnswer = answers.findBy('option.id', removedOptionId);
        answers.removeObject(removedAnswer);
        removedAnswer.deleteRecord();
      });

      addedOptionIds.forEach(addedOptionId => {
        const option = this.get('store').peekRecord('form/closed-question-option', addedOptionId);
        const addedAnswer = this.get('store').createRecord('form/closed-question-answer', { response, option });
        answers.push(addedAnswer);
      });
    }
  }
});

FormResponseComponent.reopenClass({
  positionalParams: ['form', 'response']
});

export default FormResponseComponent;
