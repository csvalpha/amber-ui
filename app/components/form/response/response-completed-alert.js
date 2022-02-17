import Component from '@ember/component';

const ResponseCompletedAlert = Component.extend({
  form: null,
});

ResponseCompletedAlert.reopenClass({
  positionalParams: ['form'],
});

export default ResponseCompletedAlert;
