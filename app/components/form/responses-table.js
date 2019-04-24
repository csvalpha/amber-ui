import Component from '@ember/component';

const ResponsesTableComponent = Component.extend({
  tagName: 'table',
  classNames: 'table',
  form: null,
  responses: null
});

ResponsesTableComponent.reopenClass({
  positionalParams: ['form', 'responses']
});

export default ResponsesTableComponent;
