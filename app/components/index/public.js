import { action, computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';
import UpcomingActivitiesToolComponent from 'amber-ui/components/tools/upcoming-activities';

export default Component.extend({
    amountOfActivities: 6,
    store: service(),
    session: service(),
    activities: computed(
      'amountOfActivities',
      'session.currentUser',
      function () {
        const params = {
          filter: { upcoming: true },
          sort: 'start_time',
        };
  
        if (this.session.currentUser) {
          params.page = { size: this.amountOfActivities };
        }
  
        return this.store.query('activity', params);
      }
    ),
  });
