import validationError from './validation-error';

export default function (values) {
  const errors = [];
  for (const attribute in values) {
    if ({}.hasOwnProperty.call(values, attribute)) {
      errors.push(validationError(`/data/attributes/${attribute}`));
    }
  }

  return errors;
}
