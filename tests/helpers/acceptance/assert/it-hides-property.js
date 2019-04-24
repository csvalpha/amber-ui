import { registerHelper } from '@ember/test';

export default registerHelper('itHidesProperty', (app, assert, { page, propertyName }) => {
  assert.ok(page[`${propertyName}IsHidden`], `The ${propertyName} property should be hidden`);
});
