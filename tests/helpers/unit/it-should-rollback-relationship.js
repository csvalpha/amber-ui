import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { registerAsyncHelper } from '@ember/test';
import createEmberModel from 'alpha-amber/tests/helpers/create-ember-model';

/**
 * @public
 * Helper which tests whether a new (temporarily) model is removed from the store when the route is deactivated.
 *
 * @param app The current application, always given by default.
 * @param assert The assert class.
 * @param route The route under testing.
 * @param relationshipName The name of the relationship on the model.
 * @param relationshipType The type of the relationship on the model.
 * @param relationshipParameters Additional parameters for the creation of the relationship.
 */
export default registerAsyncHelper('itShouldRollbackRelationship',
  (app, assert, route, modelType, relationshipName, relationshipType, properties) => {
    assert.expect(properties.length);

    const generatedModel = server.create(modelType);
    const model = createEmberModel(generatedModel, route.store);
    const generatedRelatedModel = server.create(relationshipType);
    const relatedModel = createEmberModel(generatedRelatedModel, route.store);

    run(() => {
      model.get(relationshipName).pushObject(relatedModel);
      route.set('controller', EmberObject.extend({ model }).create());
    });

    // Get the current values of the properies
    const oldValues = [];
    properties.forEach(property => {
      oldValues[property] = relatedModel.get(property);
    });

    run(() => {
      // Update properties
      properties.forEach(property => {
        relatedModel.set(property, `${oldValues[property]}123`);
      });

      // Deativate the route
      route.deactivate();
    });

    // All properties should be rolled back.
    properties.forEach(property => {
      assert.equal(relatedModel.get(property), oldValues[property], `the property '${property}' should be rolled back`);
    });
  }
);
