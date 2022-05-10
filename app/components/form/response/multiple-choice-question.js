import { ClosedQuestionBaseComponent } from './closed-question';
import { action } from '@ember/object';

export default class MultipleChoiceQuestionComponent extends ClosedQuestionBaseComponent {
  get selectedOptionIds() {
    console.log(this.args.answers);
    return this.args.answers.map((answer) => answer.option.id);
  }

  get requiredAndNothingSelected() {
    console.log(this.selectedOptionIds);
    return this.args.question.required && this.selectedOptionIds.length === 0;
  }

  @action
  handleCheckboxChange() {}
}
