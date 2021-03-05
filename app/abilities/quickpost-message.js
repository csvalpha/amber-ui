import { Ability } from 'ember-can';

export default class QuickpostMessage extends Ability {
  get canShow() {
    return this.session.hasPermission('quickpost-message.read');
  }

  get canDestroy() {
    return this.session.hasPermission('quickpost-message.destroy');
  }
}
