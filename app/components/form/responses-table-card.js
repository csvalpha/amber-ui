import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormResponsesTableCardComponent extends Component {
  session = service('session');

  @tracked sortedAttribute = 'user-id';
  @tracked sortedAscending = true;
  @tracked search = '';

  @action
  setSortedAttribute(value) {
    this.sortedAttribute = value;
  }

  @action
  setSortedAscending(value) {
    this.sortedAscending = value;
  }

  @action
  setSearch(value) {
    this.search = value;
  }

  sortableAttributes = [
    {
      value: 'updatedAt',
      label: 'Inschrijfdatum',
    },
    {
      value: 'user-id',
      label: 'Anciënniteit',
    }
  ]

  // get sortedResponses() {
  //   console.log("component: ", this.sortedAttribute);
  //   return this.form.sortedResponsesBy(this.sortedAttribute, this.sortedAscending, this.search);
  // }

  actions = {
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
  }

  positionalParams = ['form'];
}

// FormResponsesTableCardComponent.reopenClass({
//   positionalParams: ['form'],
// });

// export default FormResponsesTableCardComponent;
