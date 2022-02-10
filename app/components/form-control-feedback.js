import Component from '@ember/component';

const FormControlFeedbackComponent = Component.extend({
  errors: [],
  classNames: ['invalid-feedback'],
});

FormControlFeedbackComponent.reopenClass({
  positionalParams: ['errors'],
});

export default FormControlFeedbackComponent;
