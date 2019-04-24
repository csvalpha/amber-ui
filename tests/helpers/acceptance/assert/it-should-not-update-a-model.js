import { copy } from '@ember/object/internals';
import { registerAsyncHelper } from '@ember/test';
import Inflector from 'ember-inflector';
import { camelize } from '@ember/string';

const { inflector } = Inflector;

/**
 * @public
 * Test helper for acceptance test which validates that a model is not updated with the given values for the given attributes.
 */
export default registerAsyncHelper('itShouldNotUpdateAModel', (app, assert, { page, model, values = null, finalRouteName = null }) => {
  const { modelName } = model;
  const modelNamePlural = inflector.pluralize(modelName);
  const modelCount = currentModelCount(modelNamePlural);

  const oldValues = copy(model.attrs);
  values = values || server.build(modelName);

  const visit = page.visit({ id: model.id });

  andThen(() => {
    const startURL = currentURL();

    visit
      .form
      .fillIn(values)
      .submit();

    andThen(() => {
      if (finalRouteName) {
        assert.equal(currentRouteName(), finalRouteName, `The user should be redirected to ${finalRouteName}`);
      } else {
        assert.equal(currentURL(), startURL, 'The route should not have changed');
      }
      assert.equal(currentModelCount(modelNamePlural), modelCount, 'There should be no new model in the database');
      const updatedModel = server.db[camelize(modelNamePlural)].find(model.id);
      itShouldHaveEqualAttributes(assert, updatedModel, oldValues);
    });
  });
});
