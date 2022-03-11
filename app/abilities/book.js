import { Ability } from 'ember-can';

export default class Book extends Ability {
  get canCreate() {
    return this.session.hasPermission('book.create');
  }

  get canShow() {
    return this.session.hasPermission('book.read');
  }

  get canDestroy() {
    return this.session.hasPermission('book.destroy');
  }

  get canEdit() {
    return this.session.hasPermission('book.update');
  }
}
