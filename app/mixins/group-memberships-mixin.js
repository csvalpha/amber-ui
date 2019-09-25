import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

import { isBlank } from '@ember/utils';

export default Mixin.create({
  filter: '',
  sortedAttribute: null,
  sortedAscending: true,
  oldMembershipsAreVisible: false,
  models: computed.alias('model.memberships'),
  filteredModels: computed('models.[]', 'filter', 'sortedAttribute', 'sortedAscending', 'oldMemberships', 'currentMemberships', 'oldMembershipsAreVisible', function() {
    let records = null;

    if (this.oldMembershipsAreVisible) {
      records = this.oldMemberships;
    } else {
      records = this.currentMemberships;
    }
    return this.sortModels(this.filterModels(records));
  }),
  filterModels(models) {
    const filter = this.filter;
    const filterableAttributes = this.filterableAttributes;

    // Do not filter when no value is inserted
    if (isBlank(filter)) {
      return models;
    }

    return models.filter(model => {
      return filterableAttributes.reduce((show, attribute) => {
        const value = model.get(attribute);
        return show + value;
      }, '').toLowerCase().includes(filter.toLowerCase());
    });
  },

  sortModels(models) {
    const sortedAttribute = this.sortedAttribute;
    const sortedAscending = this.sortedAscending;
    const sortedModels = models.sortBy(sortedAttribute);

    return sortedAscending ? sortedModels : sortedModels.reverse();
  },

  oldMemberships: computed('models.length', 'models.@each.endDate', function() {
    return this.models.filter((membership) => {
      if (membership.get('endDate') && membership.get('endDate') < moment.now()) {
        return true;
      }
      return false;
    });
  }),
  currentMemberships: computed('models.length', 'models.@each.endDate', function() {
    return this.models.filter((membership) => {
      if (membership.get('endDate') && membership.get('endDate') < moment.now()) {
        return false;
      }
      return true;
    });
  }),

  oldMembershipsTabActive: computed('filteredModels', function() {
    if (this.oldMembershipsAreVisible) {
      if (this.oldMemberships.length === 0 && this.currentMemberships.length > 0) {
        return false;
      }
      return true;
    }
    if (this.currentMemberships.length === 0 && this.oldMemberships.length > 0) {
      return true;
    }
    return false;
  }),

  actions: {
    selectFirstItem() {
      if (this.filteredModels.length > 0) {
        this.transitionToRoute('users.show', this.get('filteredModels.firstObject.user.id'));
      }
    },
    showOldMemberships() {
      if (this.oldMemberships.length > 0) {
        this.set('oldMembershipsAreVisible', true);
      }
    },
    hideOldMemberships() {
      if (this.currentMemberships.length > 0) {
        this.set('oldMembershipsAreVisible', false);
      }
    }
  }
});
