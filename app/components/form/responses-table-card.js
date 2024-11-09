import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormResponsesTableCardComponent extends Component {
  @service session;
  @tracked showAllergyInfo = false;
  @action
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
  }
}
