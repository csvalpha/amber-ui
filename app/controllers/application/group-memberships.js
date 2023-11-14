import Controller from '@ember/controller';
import { action } from '@ember/object';
import { isBlank } from '@ember/utils';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';

export default class GroupMembershipsController extends Controller {
  currentMembershipsTab = 'currentMemberships';
  oldMembershipsTab = 'oldMemberships';
  @tracked sortedAttribute = null;
  @tracked filterableAttributes = null;
  @tracked sortedAscending = true;
  @tracked filter = '';
  @tracked selectedTab = this.currentMembershipsTab;

  get models() {
    return this.model.memberships;
  }

  get selectedModels() {
    if (this.currentMembershipsSelected) {
      return this.currentMemberships;
    }
    if (this.oldMembershipsSelected) {
      return this.oldMemberships;
    }
    return [];
  }

  get filteredModels() {
    return this.sortModels(this.filterModels(this.selectedModels));
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

  get currentMembershipsExist() {
    return this.currentMemberships.length > 0;
  }

  get oldMembershipsExist() {
    return this.oldMemberships.length > 0;
  }

  get currentMembershipsSelected() {
    return this.selectedTab === this.currentMembershipsTab;
  }

  get oldMembershipsSelected() {
    return this.selectedTab === this.oldMembershipsTab;
  }

  @action
  selectOldMemberships() {
    this.selectedTab = this.oldMembershipsTab;
  }

  @action
  selectCurrentMemberships() {
    this.selectedTab = this.currentMembershipsTab;
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
}
