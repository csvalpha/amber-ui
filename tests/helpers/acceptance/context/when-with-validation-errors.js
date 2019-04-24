import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('whenWithValidationErrors', (app, { method = 'post', apiPath, values }) => {
  const errors = validationErrors(values);
  server[method](apiPath, { errors }, 422);
});
