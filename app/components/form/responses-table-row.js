import Component from '@ember/component';

const ResponsesTableRowComponent = Component.extend({
  tagName: 'tr',
  form: null,
  response: null,
});

ResponsesTableRowComponent.reopenClass({
  positionalParams: ['form', 'response'],
});

export default ResponsesTableRowComponent;
