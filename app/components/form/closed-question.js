import { ClosedQuestionTypes } from 'amber-ui/constants';
import { inject as service } from '@ember/service';
import OpenQuestionComponent from './open-question';
import { action } from '@ember/object';

export default class ClosedQuestionComponent extends OpenQuestionComponent {
  @service store;
  questionTypes = ClosedQuestionTypes;
  @action
  addOption() {
    const position =
      this.question.get('sortedOptions.lastObject.position') + 1 || 0;
    this.store.createRecord('form/closed-question-option', {
      question: this.question,
      position,
    });
  }

  @action
  deleteOption(option) {
    option.deleteRecord();
  }

  @action
  moveOptionUp(option) {
    const index = this.question.get('sortedOptions').indexOf(option);
    if (index > 0) {
      const previousOption = this.question
        .get('sortedOptions')
        .objectAt(index - 1);
      this.switchPositions(option, previousOption);
    }
  }

  @action
  moveOptionDown(option) {
    const index = this.question.get('sortedOptions').indexOf(option);
    if (index < this.question.get('sortedOptions.length') - 1) {
      const nextOption = this.question.get('sortedOptions').objectAt(index + 1);
      this.switchPositions(option, nextOption);
    }
  }
}
