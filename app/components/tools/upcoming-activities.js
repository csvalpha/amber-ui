import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  amountOfActivities: 5,
  store: service(),
  session: service(),
  activities: computed('amountOfActivities', 'session.currentUser', function() {
    const params = {
      filter: { upcoming: true },
      sort: 'start_time'
    };

    if (this.get('session.currentUser')) {
      params.page = { size: this.amountOfActivities };
    }

    return this.store.query('activity', params);
  })
});
