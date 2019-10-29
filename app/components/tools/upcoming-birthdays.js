import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { isArray, A } from '@ember/array';

export default Component.extend({
  ajax: service(),
  store: service(),

  usersWithBirthdayToday: new A(),
  usersWithUpcomingBirthday: new A(),

  loadUpcomingBirthdays() {
    // eslint-disable-next-line camelcase
    return this.ajax.request('/users', { data: { filter: { upcoming_birthdays: true, group: 'Leden' } } }).then(contents => {
      // Push in store
      this.store.pushPayload(contents);

      const usersWithBirthdayToday = new A();
      const usersWithUpcomingBirthday = new A();

      // Peek from store and add to arrays
      if (contents.data && isArray(contents.data)) {
        contents.data.forEach(jsonUser => {
          const user = this.store.peekRecord('user', jsonUser.id);
          if (user.get('hasBirthdayToday')) {
            usersWithBirthdayToday.push(user);
          } else {
            usersWithUpcomingBirthday.push(user);
          }
        });
      }
      // Set on component
      this.set('usersWithBirthdayToday', usersWithBirthdayToday.sortBy('birthday'));
      this.set('usersWithUpcomingBirthday', usersWithUpcomingBirthday.sortBy('upcomingBirthdayDate'));
    });
  },
  init() {
    this._super(...arguments);
    this.loadUpcomingBirthdays().catch(() => {});
  }
});
