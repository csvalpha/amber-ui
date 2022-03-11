import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default class Activity extends Ability {
  get canCreate() {
    return this.session.hasPermission('activity.create');
  }

  get canShow() {
    return this.session.hasPermission('activity.read');
  }

  get canDestroy() {
    return this.session.hasPermission('activity.destroy');
  }

  get canSelectAllGroups() {
    return this.session.hasPermission('activity.update');
  }

  get canShowIcal() {
    return this.session.hasPermission('activity.read');
  }

  get canEdit() {
    return (
      this.session.hasPermission('activity.update') ||
      this.isActivityOwner(this.model)
    );
  }

  get canGenerateAlias() {
    const { form } = this.model;
    return (
      !isNone(form) &&
      form.get('hasResponses') &&
      this.isActivityOwner(this.model)
    );
  }

  get canPrintEnrolledMembers() {
    return this.canGenerateAlias;
  }

  isActivityOwner(activity) {
    const { currentUser } = this.session;
    console.log(currentUser.currentMemberships);
    return !isNone(currentUser) && activity.isOwner(currentUser);
  }
}
