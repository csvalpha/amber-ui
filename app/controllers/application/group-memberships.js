import Controller from '@ember/controller';
import { action } from '@ember/object';
import { isBlank } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class GroupMembershipsController extends Controller {
  @tracked sortedAttribute = null
  @tracked sortedAscending = true
  @tracked oldMembershipsAreVisible = false

  filter = ''

  get models() {
    return this.model.memberships;
  }

  get filteredModels() {
    const records = this.oldMembershipsAreVisible ? this.oldMemberships : this.currentMemberships;
    return this.sortModels(this.filterModels(records));
  }

  filterModels(models) {
    // Do not filter when no value is inserted
    if (isBlank(this.filter)) {
      return models;
    }

    return models.filter(model => {
      return this.filterableAttributes.reduce((show, attribute) => {
        const value = model[attribute];
        return show + value;
      }, '').toLowerCase().includes(this.filter.toLowerCase());
    });
  }

  sortModels(models) {
    const sortedModels = models.sortBy(this.sortedAttribute);
    return this.sortedAscending ? sortedModels : sortedModels.reverse();
  }

  get oldMemberships() {
    return this.models.filter(membership => (
      membership.get('endDate') && membership.get('endDate') < moment.now()
    ));
  }

  get currentMemberships() {
    return this.models.filter(membership => (
      !(membership.get('endDate') && membership.get('endDate') < moment.now())
    ));
  }

  get oldMembershipsTabActive() {
    return this.oldMembershipsAreVisible
      ? !(this.oldMemberships.length === 0 && this.currentMemberships.length > 0)
      : this.currentMemberships.length === 0 && this.oldMemberships.length > 0;
  }

  @action
  selectFirstItem() {
    if (this.filteredModels.length > 0) {
      this.transitionToRoute('users.show', this.filteredModels.firstObject.user.id);
    }
  }

  @action
  showOldMemberships() {
    if (this.oldMemberships.length > 0) {
      this.oldMembershipsAreVisible = true;
    }
  }

  @action
  hideOldMemberships() {
    if (this.currentMemberships.length > 0) {
      this.oldMembershipsAreVisible = false;
    }
  }
}
