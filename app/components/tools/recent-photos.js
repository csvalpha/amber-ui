import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  latestComments: computed(function () {
    /* eslint-disable camelcase */
    return this.store.query('photo-comment', {
      sort: '-updated_at',
      include: 'photo',
      page: { number: '1', size: 4 },
    });
    /* eslint-enable camelcase */
  }),
  albums: computed(function () {
    return this.store.query('photo-album', {
      sort: '-date',
      page: { number: '1', size: 3 },
    });
  }),
});
