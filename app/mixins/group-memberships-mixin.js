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

    if (this.get('oldMembershipsAreVisible')) {
      records = this.get('oldMemberships');
    } else {
      records = this.get('currentMemberships');
    }
    return this.sortModels(this.filterModels(records));
  }),
  filterModels(models) {
    const filter = this.get('filter');
    const filterableAttributes = this.get('filterableAttributes');

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
    const sortedAttribute = this.get('sortedAttribute');
    const sortedAscending = this.get('sortedAscending');
    const sortedModels = models.sortBy(sortedAttribute);

    return sortedAscending ? sortedModels : sortedModels.reverse();
  },

  oldMemberships: computed('models.length', 'models.@each.endDate', function() {
    return this.get('models').filter((membership) => {
      if (membership.get('endDate') && membership.get('endDate') < moment.now()) {
        return true;
      }
      return false;
    });
  }),
  currentMemberships: computed('models.length', 'models.@each.endDate', function() {
    return this.get('models').filter((membership) => {
      if (membership.get('endDate') && membership.get('endDate') < moment.now()) {
        return false;
      }
      return true;
    });
  }),

  oldMembershipsTabActive: computed('filteredModels', function() {
    if (this.get('oldMembershipsAreVisible')) {
      if (this.get('oldMemberships').length === 0 && this.get('currentMemberships').length > 0) {
        return false;
      }
      return true;
    }
    if (this.get('currentMemberships').length === 0 && this.get('oldMemberships').length > 0) {
      return true;
    }
    return false;
  }),

  actions: {
    selectFirstItem() {
      if (this.get('filteredModels').length > 0) {
        this.transitionToRoute('users.show', this.get('filteredModels.firstObject.user.id'));
      }
    },
    showOldMemberships() {
      if (this.get('oldMemberships').length > 0) {
        this.set('oldMembershipsAreVisible', true);
      }
    },
    hideOldMemberships() {
      if (this.get('currentMemberships').length > 0) {
        this.set('oldMembershipsAreVisible', false);
      }
    }
  }
});
