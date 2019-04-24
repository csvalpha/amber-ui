import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('itHidesProperties', (app, assert, { page, propertyNames }) => {
  propertyNames.forEach(propertyName => {
    itHidesProperty(assert, {
      page,
      propertyName
    });
  });
});
