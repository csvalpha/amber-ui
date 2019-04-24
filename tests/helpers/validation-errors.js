import { registerHelper } from '@ember/test';

export default registerHelper('validationErrors', (app, values) => {
  const errors = [];
  for (const attribute in values) {
    if ({}.hasOwnProperty.call(values, attribute)) {
      errors.push(validationError(`/data/attributes/${attribute}`));
    }
  }
  return errors;
});
