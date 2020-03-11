import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  threads: computed(function() {
    return this.store.query('forum/thread', { sort: '-updated_at', page: { number: '1', size: 7 } });
  })
});
