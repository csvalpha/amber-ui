import { get } from '@ember/object';
import { text } from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';

/**
 * @public
 * Returns an object from attribute name to text selector, for all attributes defined on the given model.
 * ie a attribute: text(testSelector('model-attribute')) for each attribute
 * @param model The model to get the attributes from (not an instance)
 * @param modelName The name to use in the selector.
 * @returns {{}}
 */
export default function defaultModelAttributeSelectors(model, modelName) {
  const attributeSelectors = {};
  get(model, 'attributes').forEach((meta, attributeName) => {
    attributeSelectors[attributeName] = text(testSelector(`${modelName}-${attributeName}`));
  });
  return attributeSelectors;
}
