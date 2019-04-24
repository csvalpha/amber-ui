import { run } from '@ember/runloop';
import { initialize } from 'alpha-amber/instance-initializers/store-on-app';
import { module, test } from 'qunit';
import startApp from '../../helpers/start-app';
import destroyApp from '../../helpers/destroy-app';

module('Unit | Instance-Initializer | store on app', {
  beforeEach() {
    run(() => {
      this.application = startApp();
      this.appInstance = this.application.buildInstance();
    });
  },
  afterEach() {
    destroyApp(this.application);
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(this.appInstance);

  // You would normally confirm the results of the initializer here
  assert.ok(true);
});
