import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  ajax: service(),
  verses: computed(function() {
    return this.store.query('daily-verse', {});
  })
});
