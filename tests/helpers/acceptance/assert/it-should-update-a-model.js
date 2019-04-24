import { registerAsyncHelper } from '@ember/test';
import Inflector from 'ember-inflector';
import { camelize } from '@ember/string';

const { inflector } = Inflector;

/**
 * @public
 * Test helper for acceptance test which validates that a model is updated with the given values.
 */
export default registerAsyncHelper('itShouldUpdateAModel', (app, assert, { page, model, finalRouteName, values = null }) => {
  const { modelName } = model;
  const modelNamePlural = inflector.pluralize(modelName);
  const modelCount = currentModelCount(modelNamePlural);

  values = values || server.build(modelName);

  page.visit({ id: model.id });

  andThen(() => {
    page
      .form
      .fillIn(values)
      .submit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), finalRouteName, 'The final route name is not correct');
    assert.equal(currentModelCount(modelNamePlural), modelCount, 'There should not be a new model in the database');
    const updatedModel = server.db[camelize(modelNamePlural)].find(model.id);
    itShouldHaveEqualAttributes(assert, updatedModel, values);
  });
});
