import Component from '@ember/component';
import { inject as service } from '@ember/service';

const FormResponsesTableCardComponent = Component.extend({
  session: service('session'),
  actions: {
    copyUsernames() {
      let usernames = this.form
        .get('responses')
        .map((response) => response.get('user.username'));
      if (!this.form.currentUserResponseCompleted) {
        usernames = usernames.filter(
          (name) => name !== this.session.currentUser.username
        );
      }
      usernames = usernames.join('\n');
      navigator.clipboard.writeText(usernames);
    },
  },
});

FormResponsesTableCardComponent.reopenClass({
  positionalParams: ['form'],
});

export default FormResponsesTableCardComponent;
