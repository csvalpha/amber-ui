import { Ability } from 'ember-can';

export default class MailAlias extends Ability {
  get canShow() {
    return this.session.hasPermission('mail-alias.read');
  }

  get canEdit() {
    return this.session.hasPermission('mail-alias.update');
  }

  get canCreate() {
    return this.session.hasPermission('mail-alias.create');
  }

  get canDestroy() {
    return this.session.hasPermission('mail-alias.destroy');
  }
}
