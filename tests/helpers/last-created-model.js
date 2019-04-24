import { registerHelper } from '@ember/test';
import { camelize } from '@ember/string';

export default registerHelper('lastCreatedModel', (app, modelName) => {
  const camelizedModelName = camelize(modelName);
  const createdModelIndex = server.db[camelizedModelName].length - 1;
  return server.db[camelizedModelName][createdModelIndex];
});
