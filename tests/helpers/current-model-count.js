import { registerHelper } from '@ember/test';
import { camelize } from '@ember/string';
import { getContext } from '@ember/test-helpers';

export default registerHelper('currentModelCount', (app, modelName) => {
  const context = getContext();
  return context.server.db[camelize(modelName)].length;
});
