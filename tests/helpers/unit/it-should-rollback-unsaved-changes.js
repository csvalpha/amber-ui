import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { registerAsyncHelper } from '@ember/test';
import createEmberModel from 'alpha-amber/tests/helpers/create-ember-model';

/**
 * @public
 * Helper which tests whether unsaved changes to a model are rolled back when leaving a route.
 *
 * @param app The current application, always given by default.
 * @param assert The assert class.
 * @param route The route under testing.
 * @parem modelType The type of the model for this route.
 * @param properties An array of property names which should be updated and rolled back on deactivation.
 */
export default registerAsyncHelper('itShouldRollbackUnsavedChanges', (app, assert, route, modelType, properties) => {
  assert.expect(properties.length);

  const generatedModel = this.server.create(modelType);
  const model = createEmberModel(generatedModel, route.store);

  // Set the current model.
  route.set('controller', EmberObject.extend({ model }).create());

  // Get the current values of the properties.
  const oldValues = [];
  properties.forEach(property => {
    oldValues[property] = model.get(property);
  });

  run(() => {
    // Update properties.
    properties.forEach(property => {
      model.set(property, `${oldValues[property]}123`);
    });

    // Deactivate the route.
    route.deactivate();
  });

  // All properties should be rolled back.
  properties.forEach(property => {
    assert.equal(model.get(property), oldValues[property], `the property '${property}' should be rolled back`);
  });
});
