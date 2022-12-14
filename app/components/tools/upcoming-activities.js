import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class UpcomingActivities extends Component {
  @service store;
  @service session;

  amountOfActivities = 5;
  activities = [];

  constructor() {
    super(...arguments);

    const params = {
      filter: { upcoming: true },
      sort: 'start_time',
    };

    if (this.session.currentUser) {
      params.page = { size: this.amountOfActivities };
    }

    this.activities = this.store.query('activity', params);
  }
}
