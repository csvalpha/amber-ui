import { get } from '@ember/object';

/**
 * @public
 * Helper which returns the property names of a DS.Model.
 */
export default function(model, { include = [], exclude = [] }) {
  const propertyNames = [];
  // Get all property names from the model
  get(model, 'attributes').forEach((_, attributeName) => propertyNames.push(attributeName));
  return propertyNames.pushObjects(include).removeObjects(exclude);
}
