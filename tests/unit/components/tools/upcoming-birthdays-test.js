import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import startMirage from 'alpha-amber/tests/helpers/setup-mirage-for-integration';

module('Unit | Component | tools/upcoming birthdays', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    startMirage(this.container);
  });

  hooks.afterEach(function() {
    window.server.shutdown();
  });

  test('it splits the birthdays today and upcoming birthdays correct', function(assert) {
    server.createList('user', 2, { hasBirthdayToday: false });
    server.createList('user', 3, { hasBirthdayToday: true });

    const done = assert.async();

    const component = this.owner.factoryFor('component:tools/upcoming_birthdays').create({
      // Mock the store
      store: EmberObject.create({
        peekRecord(type, id) {
          if (type === 'user') {
            return EmberObject.create(server.db.users.find(id));
          }
        },
        pushPayload() {
          return true;
        }
      })
    });

    component.loadUpcomingBirthdays().then(() => {
      assert.equal(component.get('usersWithUpcomingBirthday').length, 2);
      assert.equal(component.get('usersWithBirthdayToday').length, 3);
      done();
    });
  });
});
