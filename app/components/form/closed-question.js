import { ClosedQuestionTypes } from 'alpha-amber/constants';
import { inject as service } from '@ember/service';
import OpenQuestionComponent from './open-question';

export default OpenQuestionComponent.extend({
  store: service(),
  questionTypes: ClosedQuestionTypes,
  init() {
    this._super()
    this.send('addOption')
  },
  actions: {
    addOption() {
      const position = this.question.get('sortedOptions.lastObject.position') + 1 || 0;
      this.store.createRecord('form/closed-question-option', {
        question: this.question,
        position
      });
    },
    deleteOption(option) {
      option.deleteRecord();
    },
    moveOptionUp(option) {
      const index = this.question.get('sortedOptions').indexOf(option);
      if (index > 0) {
        const previousOption = this.question.get('sortedOptions').objectAt(index - 1);
        this.send('switchPositions', option, previousOption);
      }
    },
    moveOptionDown(option) {
      const index = this.question.get('sortedOptions').indexOf(option);
      if (index < (this.question.get('sortedOptions.length') - 1)) {
        const nextOption = this.question.get('sortedOptions').objectAt(index + 1);
        this.send('switchPositions', option, nextOption);
      }
    }
  }
});
