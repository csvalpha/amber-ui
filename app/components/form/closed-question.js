import { ClosedQuestionTypes } from 'alpha-amber/constants';
import OpenQuestionComponent from './open-question';

export default OpenQuestionComponent.extend({
  questionTypes: ClosedQuestionTypes,
  actions: {
    addOption() {
      this.sendAction('onAddOption', this.question);
    },
    deleteOption(option) {
      this.sendAction('onDeleteOption', option);
    },
    moveOptionUp(option) {
      this.sendAction('onMoveOptionUp', option, this.question);
    },
    moveOptionDown(option) {
      this.sendAction('onMoveOptionDown', option, this.question);
    }
  }
});
