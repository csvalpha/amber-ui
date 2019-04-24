import { registerAsyncHelper } from '@ember/test';
import Inflector from 'ember-inflector';

const { inflector } = Inflector;

/**
 * @public
 * Test helper for acceptance test which validates that a model is not created with the given values
 */
export default registerAsyncHelper('itShouldNotCreateAModel', (app, assert, { page, modelName, values = null }) => {
  const modelNamePlural = inflector.pluralize(modelName);
  const modelCount = currentModelCount(modelNamePlural);

  values = values || server.build(modelName);

  const visit = page.visit();

  andThen(() => {
    const startURL = currentURL();

    visit
      .form
      .fillIn(values)
      .submit();

    andThen(() => {
      assert.equal(currentURL(), startURL, 'The route should not have changed');
      assert.equal(currentModelCount(modelNamePlural), modelCount, 'There should be no new model in the database');
    });
  });
});
