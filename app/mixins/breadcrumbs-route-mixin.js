import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  breadCrumb: computed('title', function() {
    return { title: this.title };
  }),
  title: null
});
