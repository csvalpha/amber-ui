import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Unit | Component | tools/upcoming birthdays', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('it splits the birthdays today and upcoming birthdays correct', function(assert) {
    let component = this.owner.lookup('component:tools/upcoming_birthdays');
    this.server.createList('user', 2, { birthday: moment().add(1, 'day') });
    this.server.createList('user', 3, { birthday: moment().subtract(1, 'year') });

    let done = assert.async();

    component.loadUpcomingBirthdays().then(() => {
      assert.equal(component.get('usersWithUpcomingBirthday').length, 2);
      assert.equal(component.get('usersWithBirthdayToday').length, 3);
      done();
    });
  });

});


