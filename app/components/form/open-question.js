import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { OpenQuestionTypes } from 'amber-ui/constants';
import Component from '@glimmer/component';

export default class OpenQuestionComponent extends Component {
  @service intl;
  questionTypes = OpenQuestionTypes;

  get questionTypeOptions() {
    return this.questionTypes.map((questionType) => ({
      value: questionType,
      label: this.intl.t(`tag.input.types.${questionType}`),
    }));
  }

  get question() {
    return this.args.question;
  }

  get form() {
    return this.args.form;
  }

  @action
  moveQuestionUp() {
    const index = this.form.get('sortedQuestions').indexOf(this.question);
    if (index > 0) {
      const previousQuestion = this.form
        .get('sortedQuestions')
        .objectAt(index - 1);
      this.switchPositions(this.question, previousQuestion);
    }
  }

  @action
  moveQuestionDown() {
    const index = this.form.get('sortedQuestions').indexOf(this.question);
    if (index < this.form.get('sortedQuestions.length') - 1) {
      const nextQuestion = this.form.get('sortedQuestions').objectAt(index + 1);
      this.switchPositions(this.question, nextQuestion);
    }
  }

  @action
  deleteQuestion() {
    this.question.deleteRecord();
  }

  @action
  switchPositions(first, second) {
    const firstPosition = first.get('position');
    const secondPosition = second.get('position');

    first.set('position', secondPosition);
    second.set('position', firstPosition);
  }
}
