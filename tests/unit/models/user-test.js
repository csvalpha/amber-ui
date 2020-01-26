import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let user;

module('Unit | Model | user', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    user = run(() => this.owner.lookup('service:store').createRecord('user'));
  });

  test('User#fullName when with lastNamePrefix', (assert) => {
    assert.expect(1);
    run(() => {
      user.setProperties({ firstName: 'Henk', lastName: 'Vries', lastNamePrefix: 'de' });
      assert.equal('Henk de Vries', user.get('fullName'));
    });
  });

  test('User#fullName when without lastNamePrefix', (assert) => {
    assert.expect(1);
    run(() => {
      user.setProperties({ firstName: 'Henk', lastName: 'Vries', lastNamePrefix: null });
      assert.equal('Henk Vries', user.get('fullName'));
    });
  });

  test('User#age', (assert) => {
    assert.expect(4);
    run(() => {
      user.setProperties({ birthday: new Date() });
      assert.equal(user.get('age'), 0);

      user.setProperties({ birthday: moment().subtract(20, 'years').toDate() });
      assert.equal(user.get('age'), 20);

      user.setProperties({ birthday: moment().subtract(20, 'years').subtract(1, 'day').toDate() });
      assert.equal(user.get('age'), 20);

      user.setProperties({ birthday: moment().subtract(20, 'years').add(1, 'day').toDate() });
      assert.equal(user.get('age'), 19);
    });
  });

  test('User#upcomingBirthdayAge', (assert) => {
    assert.expect(4);
    run(() => {
      user.setProperties({ birthday: new Date() });
      assert.equal(user.get('upcomingBirthdayAge'), 1);

      user.setProperties({ birthday: moment().subtract(20, 'years').toDate() });
      assert.equal(user.get('upcomingBirthdayAge'), 21);

      user.setProperties({ birthday: moment().subtract(20, 'years').subtract(1, 'day').toDate() });
      assert.equal(user.get('upcomingBirthdayAge'), 21);

      user.setProperties({ birthday: moment().subtract(20, 'years').add(1, 'day').toDate() });
      assert.equal(user.get('upcomingBirthdayAge'), 20);
    });
  });

  test('User#hasBirthdayToday when user has birthday', (assert) => {
    assert.expect(4);
    run(() => {
      user.setProperties({ birthday: new Date() });
      assert.ok(user.get('hasBirthdayToday'));

      user.setProperties({ birthday: moment().subtract(20, 'years').toDate() });
      assert.ok(user.get('hasBirthdayToday'));

      user.setProperties({ birthday: moment().hour(12).minute(30).toDate() });
      assert.ok(user.get('hasBirthdayToday'));

      user.setProperties({ birthday: moment().hour(0).minute(0).second(0).toDate() });
      assert.ok(user.get('hasBirthdayToday'));
    });
  });

  test('User#hasBirthdayToday when user does not have birthday', (assert) => {
    assert.expect(2);
    run(() => {
      user.setProperties({ birthday: moment().add(1, 'day').toDate() });
      assert.notOk(user.get('hasBirthdayToday'));

      user.setProperties({ birthday: moment().add(5, 'months').toDate() });
      assert.notOk(user.get('hasBirthdayToday'));
    });
  });
});
