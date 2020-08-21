import { alias } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';

export default Mixin.create({
  page: computed('model.page', {
    get() {
      return this.model?.page;
    },
    set(key, value) {
      // The first time this is called, content is null resulting in an error
      if (!isNone(this.model)) {
        this.set('model.page', value);
      }

      return value;
    }
  }),

  paginator: alias('model'),
  pagedModel: alias('model.content')
});
