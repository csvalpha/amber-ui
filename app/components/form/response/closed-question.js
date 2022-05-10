import Component from '@glimmer/component';

export class ClosedQuestionBaseComponent extends Component {
  get options() {
    return this.args.question.sortedOptions.map((option) => {
      return {
        label: option.option,
        value: option.id,
      };
    });
  }

  get inputIdentifier() {
    return `question-${this.args.question.get('id')}`;
  }
}

export default class ClosedQuestionComponent extends ClosedQuestionBaseComponent {
  get errors() {
    return this.args.answer.errors;
  }

  get selectedOptionId() {
    return this.args.answer.option.get('id');
  }

  set selectedOptionId(value) {
    this.args.answer.option = this.args.question.options.find(
      (option) => option.id === value
    );
  }
}
