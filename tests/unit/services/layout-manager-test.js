import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setBreakpoint } from 'ember-responsive/test-support';
import Service from '@ember/service';

class SessionStub extends Service {
  isAuthenticated = false;
}

module('Unit | Service | layoutManager', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:session', SessionStub);
  });

  test('it sets the left sidebar visibility according to media device', function (assert) {
    let service = this.owner.lookup('service:layout-manager');
    service.set('session.isAuthenticated', true);

    setBreakpoint('desktop');
    assert.ok(service.leftSideBarOpen);
    service.closeLeftSidebarIfOnMobile();
    assert.ok(service.leftSideBarOpen);

    setBreakpoint('mobile');
    assert.notOk(service.leftSideBarOpen);
    assert.ok(service.leftSideBarExpanded);

    service.closeLeftSidebarIfOnMobile();
    assert.notOk(service.leftSideBarOpen);
    assert.ok(service.leftSideBarExpanded);

    service.set('session.isAuthenticated', false);
    setBreakpoint('mobile');
    assert.notOk(service.leftSideBarOpen);
    setBreakpoint('desktop');
    assert.notOk(service.leftSideBarOpen);
  });

  test('it sets the left sidebar visibility according to localStorage - true', function (assert) {
    const service = this.owner.lookup('service:layout-manager');
    service.set('session.isAuthenticated', true);

    // The value in localStorage is only used on non-mobile devices.
    setBreakpoint('desktop');
    service.init();
    assert.ok(service.leftSideBarOpen);

    // Simulate localstorage and return true
    service.set('localStorage', {
      getItem(identifier) {
        // Return string because localstorage does return string
        return identifier === 'leftSideBarExpanded' ? 'true' : 'false';
      },
    });

    assert.ok(service.leftSideBarExpanded);
  });
  test('it sets the left sidebar visibility according to localStorage - false', function (assert) {
    const service = this.owner.lookup('service:layout-manager');
    service.set('session.isAuthenticated', true);

    setBreakpoint('desktop');
    service.set('localStorage', {
      getItem(identifier) {
        // Return string because localstorage does return string
        return identifier === 'leftSideBarExpanded' ? 'false' : 'true';
      },
    });

    assert.notOk(service.leftSideBarExpanded);
  });
});
