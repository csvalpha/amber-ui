import Controller from '@ember/controller';
import { action } from '@ember/object';
import { isBlank } from '@ember/utils';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';

export default class GroupMembershipsController extends Controller {
  @tracked filter = '';
  @tracked oldMembershipsAreVisible = false;
  @tracked sortedAttribute = null;
  @tracked sortedAscending = true;

  get models() {
    return this.model.memberships;
  }

  get filteredModels() {
    const records = this.oldMembershipsAreVisible
      ? this.oldMemberships
      : this.currentMemberships;
    return this.sortModels(this.filterModels(records));
  }

  filterModels(models) {
    // Do not filter when no value is inserted
    if (isBlank(this.filter)) {
      return models;
    }

    return models.filter((model) => {
      return this.filterableAttributes
        .reduce((show, attribute) => {
          const value = model.get(attribute);
          return show + value;
        }, '')
        .toLowerCase()
        .includes(this.filter.toLowerCase());
    });
  }

  sortModels(models) {
    const sortedModels = models.sortBy(this.sortedAttribute);
    return this.sortedAscending ? sortedModels : sortedModels.reverse();
  }

  get oldMemberships() {
    return this.models.filter(
      (membership) => membership.endDate && membership.endDate < moment.now()
    );
  }

  get currentMemberships() {
    return this.models.filter(
      (membership) => !(membership.endDate && membership.endDate < moment.now())
    );
  }

  get oldMembershipsTabActive() {
    return this.oldMembershipsAreVisible
      ? !(
          this.oldMemberships.length === 0 && this.currentMemberships.length > 0
        )
      : this.currentMemberships.length === 0 && this.oldMemberships.length > 0;
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

  @action
  setFilter(value) {
    this.filter = value;
  }

  @action
  setSortedAttribute(value) {
    this.sortedAttribute = value;
  }

  @action
  setSortedAscending(value) {
    this.sortedAscending = value;
  }
}
