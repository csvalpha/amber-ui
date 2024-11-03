import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FormFormComponent extends Component {
  @service store;
  get model() {
    return this.args.model;
  }

  createQuestion(modelClass, fieldType) {
    const form = this.model;
    const position = form.get('sortedQuestions.lastObject.position') + 1 || 0;
    this.store.createRecord(modelClass, {
      form,
      fieldType,
      position,
      required: true,
    });
  }

  @action
  addOpenQuestion() {
    this.createQuestion('form/open-question', 'text');
  }

  @action
  addClosedQuestion() {
    this.createQuestion('form/closed-question', 'radio');
  }
}
