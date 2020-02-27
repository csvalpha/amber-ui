import { run } from '@ember/runloop';
import Application from '@ember/application';
import DS from 'ember-data';
import { initialize } from 'alpha-amber/initializers/model-save-if-dirty';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

const { Model } = DS;

module('Unit | Initializer | model save if dirty', function(hooks) {
  hooks.beforeEach(function() {
    run(() => {
      this.application = Application.create();
      this.application.deferReadiness();
    });
  });

  hooks.afterEach(function() {
    destroyApp(this.application);
  });

  test('it adds Model#saveIfDirty', function(assert) {
    initialize(this.application);
    assert.ok(Model.proto().saveIfDirty);
  });
});
