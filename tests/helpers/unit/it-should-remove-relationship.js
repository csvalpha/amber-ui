import EmberObject from '@ember/object';
import { run } from '@ember/runloop';

export default function (assert, route, relationshipName, relationshipType, relationshipParameters = {}) {
  assert.expect(1);

  // Get the initial amount of models.
  const count = route.store.peekAll(relationshipType).get('length');
  const model = route.model();

  run(() => {
    model
      .get(relationshipName)
      .pushObject(
        route.store.createRecord(relationshipType, relationshipParameters)
      );

    // Set the current model.
    route.set('controller', EmberObject.extend({ model }).create());

    // Deactivate the route.
    route.deactivate();
  });

  // There should be no new model.
  assert.equal(
    route.store.peekAll(relationshipType).get('length'),
    count,
    `There should be no new ${relationshipType} in the store after deactivation`
  );
);
