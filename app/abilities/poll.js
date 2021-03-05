import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default class Poll extends Ability {
  get canShow() {
    return this.session.hasPermission('poll.read');
  }

  get canCreate() {
    return this.session.hasPermission('poll.create');
  }

  get canDestroy() {
    return this.session.hasPermission('poll.destroy');
  }

  get canEdit() {
    return this.session.hasPermission('poll.update') || this.isPollOwner(this.model);
  }

  isPollOwner(poll) {
    const { currentUser } = this.session;
    return !isNone(currentUser) && (poll.get('author.id') === currentUser.get('id'));
  }
}
