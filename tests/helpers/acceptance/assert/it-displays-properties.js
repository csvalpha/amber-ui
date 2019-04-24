import { registerHelper } from '@ember/test';

export default registerHelper('itDisplaysProperties', (app, assert, { page, displayValues, propertyNames }) => {
  propertyNames.forEach(propertyName => {
    itDisplaysProperty(assert, {
      page,
      displayValues,
      propertyName
    });
  });
});
