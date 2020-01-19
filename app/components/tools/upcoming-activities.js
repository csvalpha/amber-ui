import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
  amountOfActivities: 5,
  store: service(),
  ajax: service(),
  session: service(),
  activities: null,
  loadUpcomingActivities(context) {
    const data = { filter: { upcoming: true }, sort: 'start_time' };
    if (this.get('session.currentUser')) {
      data.page = { size: this.amountOfActivities };
    }

    return this.ajax.request('/activities', { data }).then(result => {
      this.store.pushPayload(result);
      const activities = new A();
      result.data.forEach(jsonObject => {
        const activity = this.store.peekRecord('activity', jsonObject.id);
        activities.push(activity);
      });
      context.set('activities', activities);
    });
  },
  init() {
    this._super(...arguments);
    this.loadUpcomingActivities(this);
  }
});
