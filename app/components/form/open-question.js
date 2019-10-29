import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { OpenQuestionTypes } from 'alpha-amber/constants';

const OpenQuestionComponent = Component.extend({
  i18n: service(),
  question: null,
  questionTypes: OpenQuestionTypes,
  questionTypeOptions: computed('questionTypes', function() {
    return this.questionTypes.map(questionType => ({
      value: questionType,
      label: this.i18n.t(`tag.input.types.${questionType}`)
    }));
  }),
  actions: {
    moveQuestionUp() {
      this.sendAction('onMoveQuestionUp', this.question);
    },
    moveQuestionDown() {
      this.sendAction('onMoveQuestionDown', this.question);
    },
    deleteQuestion() {
      this.sendAction('onDeleteQuestion', this.question);
    }
  }
});

OpenQuestionComponent.reopenClass({
  positionalParams: ['question']
});

export default OpenQuestionComponent;
