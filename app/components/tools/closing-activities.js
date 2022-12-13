import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class ClosingActivities extends Component {
  @service store;

  activities = []

  constructor() {
    super(...arguments);

    const params = {
      filter: { closing: true },
      // Include form for correct display of form-opened-label
      include: 'form',
      sort: 'form.respond_until',
    };

    this.activities = this.store.query('activity', params);
  }
}
