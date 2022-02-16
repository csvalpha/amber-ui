import EmberObject from '@ember/object';
import { run } from '@ember/runloop';

export default function (assert, route, modelType) {
  assert.expect(1);

  // Get the initial amount of models.
  const count = route.store.peekAll(modelType).get('length');
  const model = route.model();

  run(() => {
    // Set the current model.
    route.set('controller', EmberObject.extend({ model }).create());

    // Deactivate the route.
    route.deactivate();
  });

  // There should be no new model.
  assert.equal(
    route.store.peekAll(modelType).get('length'),
    count,
    `There should be no new ${modelType} in the store after deactivation`
  );
);
