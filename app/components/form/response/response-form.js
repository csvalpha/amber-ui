import { inject as service } from '@ember/service';
import Component from '@ember/component';

const FormResponseComponent = Component.extend({
  store: service(),
  actions: {
    updateMultipleChoiceAnswers(question, optionIds) {
      const answers = question.get('linkedAnswers');
      const previousOptionIds = answers.mapBy('option.id').rejectBy('isDeleted');
      const removedOptionIds = previousOptionIds.reject(id => optionIds.includes(id));
      const addedOptionIds = optionIds.reject(id => previousOptionIds.includes(id));

      console.log(previousOptionIds)
      console.log(removedOptionIds)
      console.log(addedOptionIds)

      removedOptionIds.forEach(removedOptionId => {
        const removedAnswer = answers.findBy('option.id', removedOptionId);
        answers.removeObject(removedAnswer);
        removedAnswer.deleteRecord();
      });

      addedOptionIds.forEach(addedOptionId => {
        const option = this.store.peekRecord('form/closed-question-option', addedOptionId);
        const addedAnswer = this.store.createRecord('form/closed-question-answer', { response: this.response, option });
        answers.push(addedAnswer);
      });
    }
  }
});

FormResponseComponent.reopenClass({
  positionalParams: ['form', 'response']
});

export default FormResponseComponent;
