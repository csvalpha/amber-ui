import { Ability } from 'ember-can';

export default class Category extends Ability {
  get canShow() {
    return this.session.hasPermission('forum/category.read');
  }

  get canCreate() {
    return this.session.hasPermission('forum/category.create');
  }

  get canEdit() {
    return this.session.hasPermission('forum/category.update');
  }

  get canDestroy() {
    return this.session.hasPermission('forum/category.destroy');
  }
}
