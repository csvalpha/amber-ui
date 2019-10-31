import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  search: '',
  sortableAttributes: [],
  sortedAttribute: null,
  sortedAscending: true,
  sort: computed('sortedAttribute', 'sortedAscending', {
    get() {
      if (this.sortedAscending) {
        return this.sortedAttribute;
      }
      return `-${this.sortedAttribute}`;
    },
    set(key, value) {
      if (value !== undefined) {
        if (value.startsWith('-')) {
          this.set('sortedAscending', false);
          this.set('sortedAttribute', value.substring(1));
        } else {
          this.set('sortedAscending', true);
          this.set('sortedAttribute', value);
        }
        return value;
      }
    }
  }),
  actions: {
    selectFirstItem() {
      if (this.routeOnEnter && this.model.length > 0) {
        const routeOnEnterParam = this.routeOnEnterParam || 'id';
        this.transitionToRoute(this.routeOnEnter, this.get(`model.firstObject.${routeOnEnterParam}`));
      }
    }
  }
});
