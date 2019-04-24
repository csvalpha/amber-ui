import Component from '@ember/component';

const FormClosedAlert = Component.extend({
  form: null
});

FormClosedAlert.reopenClass({
  positionalParams: ['form']
});

export default FormClosedAlert;
