import EmberObject from '@ember/object';
import { resolve, reject } from 'rsvp';
import Service from '@ember/service';
import { copy } from '@ember/object/internals';
import { run } from '@ember/runloop';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';
import { module, test } from 'qunit';

let subject;
const mockTransition = {};

const mockSession = Service.extend({});

module('Unit | Mixin | authorization route mixin', function(hooks) {
  hooks.beforeEach(function() {
    const AuthorizationRouteMixinObject = EmberObject.extend(AuthorizationRouteMixin);
    subject = AuthorizationRouteMixinObject.create({
      session: mockSession.create()
    });
  });

  /* eslint-disable prefer-arrow-callback */
  test('onAccessDenied throws an error', function(assert) {
    const transition = copy(mockTransition);
    assert.throws(function() {
      return subject.get('onAccessDenied')('module/class.action', transition);
    }, function(error) {
      return error.isAuthorizationMixinError;
    });
  });
  /* eslint-enable prefer-arrow-callback */

  test('beforeModel checks if the user has access using canAccess', (assert) => {
    assert.expect(8);
    const done = assert.async(5);

    const cases = [{
      canAccess() {
        return true;
      },
      expectedAllowed: true
    }, {
      canAccess() {
        return false;
      },
      expectedAllowed: false
    }, {
      canAccess() {
        return resolve(true);
      },
      expectedAllowed: true
    }, {
      canAccess() {
        return resolve(false);
      },
      expectedAllowed: false
    }, {
      canAccess() {
        return reject(false);
      },
      expectedAllowed: false
    }];

    cases.forEach(({ canAccess, expectedAllowed }) => {
      const transition = {
        targetName: 'foo',
        params: {}
      };

      // For some reason, `this` in the mixin is undefined. We bind `this` as the mixin on the function.
      const beforeModel = run.bind(subject, subject.get('beforeModel'));
      subject.canAccess = canAccess;

      beforeModel(transition).then(() => {
        assert.ok(expectedAllowed);
        done();
      }).catch(error => {
        assert.ok(error.isAuthorizationMixinError);
        assert.notOk(expectedAllowed);
        done();
      });
    });
  });
});
