import Component from '@glimmer/component';

export default class OpenQuestionComponent extends Component {
  get inputIdentifier() {
    return `question-${this.args.question.id}`;
  }
}
