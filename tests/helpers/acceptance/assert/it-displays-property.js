import { registerHelper } from '@ember/test';

export default registerHelper('itDisplaysProperty', (app, assert, { page, displayValues, propertyName }) => {
  assert.equal(page[propertyName], displayValues[propertyName], `The ${propertyName} property should be displayed correctly`);
});
