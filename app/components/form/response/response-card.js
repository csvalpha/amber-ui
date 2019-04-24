import Component from '@ember/component';

const FormResponseCardComponent = Component.extend({
  classNames: ['card'],
  form: null,
  response: null,
  actions: {
    submitResponse() {
      this.sendAction('submitResponse');
    }
  }
});

FormResponseCardComponent.reopenClass({
  positionalParams: ['form', 'response']
});

export default FormResponseCardComponent;
