import { Ability } from 'ember-can';

export default class StaticPage extends Ability {
  get canCreate() {
    return this.session.hasPermission('static-page.create');
  }

  canShow = true;

  get canEdit() {
    return this.session.hasPermission('static-page.update');
  }

  get canDestroy() {
    return this.session.hasPermission('static-page.destroy');
  }
}
