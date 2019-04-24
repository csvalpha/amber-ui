import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  search: '',
  sortableAttributes: [],
  sortedAttribute: null,
  sortedAscending: true,
  sort: computed('sortedAttribute', 'sortedAscending', {
    get() {
      if (this.get('sortedAscending')) {
        return this.get('sortedAttribute');
      }
      return `-${this.get('sortedAttribute')}`;
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
      if (this.get('routeOnEnter') && this.get('model').length > 0) {
        const routeOnEnterParam = this.get('routeOnEnterParam') || 'id';
        this.transitionToRoute(this.get('routeOnEnter'), this.get(`model.firstObject.${routeOnEnterParam}`));
      }
    }
  }
});
