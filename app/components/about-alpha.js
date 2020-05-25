import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  classNames: ['about-alpha'],
  store: service(),
  videos: computed(function() {
    return this.store.findAll('about-alpha-video');
  })
});
