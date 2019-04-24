import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  ajax: service(),
  activities: null,
  loadClosingActivities(context) {
    const data = {
      filter: { closing: true },
      // Include form for correct display of form-opened-label
      include: 'form',
      sort: 'form.respond_until'
    };

    return this.get('ajax').request('/activities', { data }).then(result => {
      this.get('store').pushPayload(result);
      const activities = new A();
      result.data.forEach(jsonObject => {
        const activity = this.get('store').peekRecord('activity', jsonObject.id);
        activities.push(activity);
      });
      context.set('activities', activities);
    });
  },
  init() {
    this._super(...arguments);
    this.loadClosingActivities(this);
  }
});
