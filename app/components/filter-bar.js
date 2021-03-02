import Component from '@ember/component';
import { computed } from '@ember/object';
import { debounce } from '@ember/runloop';

export default Component.extend({
  filter: null,
  classNames: ['d-none d-md-flex'],
  sortedAttribute: null,
  sortableAttributes: null,
  sortedAscending: null,
  filterDebounce: computed('', {
    set(key, value) {
      debounce(this, this.setFilter, value, 250);
      return null;
    }
  }),
  setFilter(filter) {
    this.set('filter', filter);
  },
  didInsertElement() {
    this._super(...arguments);
    this.set('filter', '');
  }
});
