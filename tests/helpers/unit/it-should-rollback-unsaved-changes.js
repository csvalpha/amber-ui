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

  const generatedModel = server.create(modelType);
  const model = createEmberModel(generatedModel, route.store);

  // Set as current model on controller
  route.set('controller', EmberObject.extend({ model }).create());

  // Get the current values of the properies
  const oldValues = [];
  properties.forEach(property => {
    oldValues[property] = model.get(property);
  });

  run(() => {
    // Update properties
    properties.forEach(property => {
      model.set(property, `${oldValues[property]}123`);
    });

    // Deativate the route
    route.deactivate();
  });

  // All properties should be rolled back.
  properties.forEach(property => {
    assert.equal(model.get(property), oldValues[property], `the property '${property}' should be rolled back`);
  });
});
