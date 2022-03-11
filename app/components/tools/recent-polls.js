import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  polls: computed(function () {
    return this.store.query('poll', {
      sort: '-created_at',
      page: { number: '1', size: 5 },
    });
  }),
});
