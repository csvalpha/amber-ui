import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  sortProperties: ['hasBirthdayToday:desc', 'upcomingBirthdayDate:asc', 'age:asc'],

  users: computed(function() {
    const params = {
      // eslint-disable-next-line camelcase
      filter: { upcoming_birthdays: true, group: 'Leden' }
    };

    return this.store.query('user', params);
  }),

  sortedUsers: computed.sort('users', 'sortProperties')
});
