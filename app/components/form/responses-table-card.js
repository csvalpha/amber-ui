import Component from '@ember/component';

const FormResponsesTableCardComponent = Component.extend({
  actions: {
    copyUsernames() {
      const usernames = this.form
        .get('responses')
        .map((response) => response.get('user.username'))
        .join('\n');

      navigator.clipboard.writeText(usernames);
    },
  },
});

FormResponsesTableCardComponent.reopenClass({
  positionalParams: ['form'],
});

export default FormResponsesTableCardComponent;
