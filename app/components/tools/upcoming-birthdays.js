import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  sortProperties: [
    'hasBirthdayToday:desc',
    'upcomingBirthdayDate:asc',
    'age:asc',
  ],

  users: computed(function () {
    /* eslint-disable camelcase */
    const params = {
      filter: { upcoming_birthdays: true, group: 'Leden' },
    };
    /* eslint-enable camelcase */

    return this.store.query('user', params);
  }),

  sortedUsers: sort('users', 'sortProperties'),
});
