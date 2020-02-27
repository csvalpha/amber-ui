import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | layoutManager', function(hooks) {
  setupTest(hooks);

  test('it sets the left sidebar visibility according to media device', function(assert) {
    const service = this.owner.lookup('service:layout-manager');
    service.set('session.isAuthenticated', true);

    service.set('media.isMobile', false);
    assert.ok(service.get('leftSideBarOpen'));

    service.set('media.isMobile', true);
    assert.notOk(service.get('leftSideBarOpen'));
    assert.ok(service.get('leftSideBarExpanded'));

    service.set('media.isMobile', false);
    service.set('leftSideBarOpen', true);
    service.closeLeftSidebarIfOnMobile();
    assert.ok(service.get('leftSideBarOpen'));

    service.set('media.isMobile', true);
    service.closeLeftSidebarIfOnMobile();
    assert.notOk(service.get('leftSideBarOpen'));
    assert.ok(service.get('leftSideBarExpanded'));

    service.set('session.isAuthenticated', false);
    service.set('media.isMobile', true);
    assert.notOk(service.get('leftSideBarOpen'));
    service.set('media.isMobile', false);
    assert.notOk(service.get('leftSideBarOpen'));
  });

  test('it sets the left sidebar visibility according to localStorage', function(assert) {
    const service = this.owner.lookup('service:layout-manager');

    service.set('session.isAuthenticated', true);

    // The value in localStorage is only used on non-mobile devices.
    service.set('media.isMobile', false);
    assert.ok(service.get('leftSideBarOpen'));

    // Simulate localstorage and return true
    service.set('localStorage', {
      getItem(identifier) {
        // Return string because localstorage does return string
        return identifier === 'leftSideBarExpanded' ? 'true' : 'false';
      }
    });

    assert.ok(service.get('leftSideBarExpanded'));

    // Simulate localstorage and return false
    service.set('localStorage', {
      getItem(identifier) {
        return identifier === 'leftSideBarExpanded' ? 'false' : 'true';
      }
    });

    assert.ok(service.get('leftSideBarOpen'));
    assert.notOk(service.get('leftSideBarExpanded'));

    service.set('session.isAuthenticated', false);
    assert.notOk(service.get('leftSideBarOpen'));
  });

  test('it toggles the left sidebar visibility with manual functions', function(assert) {
    const service = this.owner.lookup('service:layout-manager');
    service.set('leftSideBarOpen', false);
    service.toggleLeftSidebar();
    assert.ok(service.get('leftSideBarOpen'));
    service.toggleLeftSidebar();
    assert.notOk(service.get('leftSideBarOpen'));
    service.openLeftSidebar();
    assert.ok(service.get('leftSideBarOpen'));
    service.closeLeftSidebar();
    assert.notOk(service.get('leftSideBarOpen'));
  });

  test('it toggles the left sidebar expansion', function(assert) {
    const service = this.owner.lookup('service:layout-manager');

    // Expansion is only relevent on non-mobile devices
    service.set('media.isMobile', false);

    // Toggle
    service.set('leftSideBarExpanded', false);
    service.toggleLeftSidebarExpansion();
    assert.ok(service.get('leftSideBarExpanded'));
    service.toggleLeftSidebarExpansion();
    assert.notOk(service.get('leftSideBarExpanded'));

    service.expandLeftSidebar();
    assert.ok(service.get('leftSideBarExpanded'));
    service.contractLeftSidebar();
    assert.notOk(service.get('leftSideBarExpanded'));
    service.set('leftSideBarExpanded', false);
  });
});
