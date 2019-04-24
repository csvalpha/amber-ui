import { registerAsyncHelper } from '@ember/test';
import Inflector from 'ember-inflector';

const { inflector } = Inflector;

/**
 * @public
 * Test helper for acceptance test which validates that a model is created with the given values for the given attributes.
 */
export default registerAsyncHelper('itShouldCreateAModel', (app, assert, { page, modelName, finalRouteName, values = null }) => {
  const modelNamePlural = inflector.pluralize(modelName);
  const modelCount = currentModelCount(modelNamePlural);

  values = values || server.build(modelName);

  page.visit();

  andThen(() => {
    page
      .form
      .fillIn(values)
      .submit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), finalRouteName, 'The final route name is not correct');
    assert.equal(currentModelCount(modelNamePlural), modelCount + 1, 'There should be a new model in the database');
    const createdModel = lastCreatedModel(modelNamePlural);
    itShouldHaveEqualAttributes(assert, createdModel, values);
  });
});
