import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';

export default Mixin.create({
  page: computed('model.page', {
    get() {
      return this.get('model.page');
    },
    set(key, value) {
      // The first time this is called, content is null resulting in an error
      if (!isNone(this.get('model'))) {
        this.set('model.page', value);
      }
      return value;
    }
  }),

  paginator: computed.alias('model'),
  pagedModel: computed.alias('model.content')
});
