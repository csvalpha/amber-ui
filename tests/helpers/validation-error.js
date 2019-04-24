import { registerHelper } from '@ember/test';

export default registerHelper('validationError', (app, pointer) => {
  return {
    status: 422,
    source: { pointer },
    detail: 'testfoutmelding'
  };
});
