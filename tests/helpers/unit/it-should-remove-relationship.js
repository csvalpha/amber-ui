import { run } from '@ember/runloop';
import { registerAsyncHelper } from '@ember/test';
import EmberObject from '@ember/object';

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
export default registerAsyncHelper('itShouldRemoveRelationship',
  (app, assert, route, relationshipName, relationshipType, relationshipParameters = {}) => {
    assert.expect(1);

    // Get the initial amount of models
    const count = route.store.peekAll(relationshipType).get('length');
    const model = route.model();

    run(() => {
      model.get(relationshipName).pushObject(
        route.store.createRecord(relationshipType, relationshipParameters)
      );

      // Set the current model
      route.set('controller', EmberObject.extend({ model }).create());

      // Deativate the route
      route.deactivate();
    });

    // There should be no new model
    assert.equal(route.store.peekAll(relationshipType).get('length'), count,
      `There should be no new ${relationshipType} in the store after deactivation`);
  }
);
