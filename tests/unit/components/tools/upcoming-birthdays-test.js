import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import startMirage from 'alpha-amber/tests/helpers/setup-mirage-for-integration';

moduleForComponent('tools/upcoming_birthdays', 'Unit | Component | tools/upcoming birthdays', {
  needs: ['service:ajax', 'service:session', 'service:intl', 'service:localStorage', 'service:raven'],
  unit: true,
  beforeEach() {
    startMirage(this.container);
  },
  afterEach() {
    window.server.shutdown();
  }
});

test('it splits the birthdays today and upcoming birthdays correct', function(assert) {
  server.createList('user', 2, { hasBirthdayToday: false });
  server.createList('user', 3, { hasBirthdayToday: true });

  const done = assert.async();

  const component = this.subject({
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
