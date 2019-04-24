import { registerHelper } from '@ember/test';
import { camelize } from '@ember/string';

export default registerHelper('currentModelCount', (app, modelName) => {
  return server.db[camelize(modelName)].length;
});
