import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { registerAsyncHelper } from '@ember/test';
/**
 * @public
 * Helper which tests whether a new (temporarily) model is removed from the store when the route is deactivated.
 *
 * @param app The current application, always given by default.
 * @param assert The assert class.
 * @param route The route under testing.
 * @param properties The type of the model which should be removed from the store.
 */
export default registerAsyncHelper('itShouldRemoveNewModel', (app, assert, route, modelType) => {
  assert.expect(1);

  // Get the initial amount of models
  const count = route.store.peekAll(modelType).get('length');
  const model = route.model();

  run(() => {
    // Set the current model
    route.set('controller', EmberObject.extend({ model }).create());

    // Deativate the route
    route.deactivate();
  });

  // There should be no new model
  assert.equal(route.store.peekAll(modelType).get('length'), count, `There should be no new ${modelType} in the store after deactivation`);
});
