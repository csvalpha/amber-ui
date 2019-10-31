import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  staticPages: computed(function() {
    return this.store.findAll('static-page');
  })
});
