import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default class Vacancy extends Ability {
  get canCreate() {
    return this.session.hasPermission('vacancy.create');
  }

  get canShow() {
    return this.session.hasPermission('vacancy.read');
  }

  get canDestroy() {
    return this.session.hasPermission('vacancy.destroy');
  }

  get canEdit() {
    return (
      this.session.hasPermission('vacancy.update') ||
      this.isVacancyOwner(this.model)
    );
  }

  get canSelectAllGroups() {
    return this.session.hasPermission('vacancy.update');
  }

  isVacancyOwner(vacancy) {
    const { currentUser } = this.session;
    return !isNone(currentUser) && vacancy.isOwner(currentUser);
  }
}
