import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import createEmberModel from 'alpha-amber/tests/helpers/create-ember-model';
import { getContext } from '@ember/test-helpers';

export default function(assert, route, modelType, relationshipName, relationshipType, properties) {
  assert.expect(properties.length);

  const context = getContext();
  const generatedModel = context.server.create(modelType);
  const model = createEmberModel(generatedModel, route.store);
  const generatedRelatedModel = context.server.create(relationshipType);
  const relatedModel = createEmberModel(generatedRelatedModel, route.store);

  run(() => {
    model.get(relationshipName).pushObject(relatedModel);
    route.set('controller', EmberObject.extend({ model }).create());
  });

  // Get the current values of the properties.
  const oldValues = [];
  properties.forEach(property => {
    oldValues[property] = relatedModel.get(property);
  });

  run(() => {
    // Update properties.
    properties.forEach(property => {
      relatedModel.set(property, `${oldValues[property]}123`);
    });

    // Deactivate the route.
    route.deactivate();
  });

  // All properties should be rolled back.
  properties.forEach(property => {
    assert.equal(relatedModel.get(property), oldValues[property], `the property '${property}' should be rolled back`);
  });
}
