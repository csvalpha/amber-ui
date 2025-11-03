import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FormResponseComponent extends Component {
  @service store;
  @action
  updateMultipleChoiceAnswers(question, optionIds) {
    setTimeout(() => {
      const answers = question.get('linkedAnswers');
      const previousOptionIds = answers
        .mapBy('option.id')
        .rejectBy('isDeleted');
      const removedOptionIds = previousOptionIds.reject((id) =>
        optionIds.includes(id)
      );
      const addedOptionIds = optionIds.reject((id) =>
        previousOptionIds.includes(id)
      );

      removedOptionIds.forEach((removedOptionId) => {
        const removedAnswer = answers.findBy('option.id', removedOptionId);
        answers.removeObject(removedAnswer);
        removedAnswer.deleteRecord();
      });

      addedOptionIds.forEach((addedOptionId) => {
        const option = this.store.peekRecord(
          'form/closed-question-option',
          addedOptionId
        );
        const addedAnswer = this.store.createRecord(
          'form/closed-question-answer',
          { response: this.args.response, option }
        );
        answers.push(addedAnswer);
      });
    }, 10);
  }
}
