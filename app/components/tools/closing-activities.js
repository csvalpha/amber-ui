import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  activities: computed(function () {
    const params = {
      filter: { closing: true },
      // Include form for correct display of form-opened-label
      include: 'form',
      sort: 'form.respond_until',
    };

    return this.store.query('activity', params);
  }),
});
