import { camelize } from '@ember/string';
import { getContext } from '@ember/test-helpers';

export default function(modelName) {
  const context = getContext();
  const camelizedModelName = camelize(modelName);
  const createdModelIndex = context.server.db[camelizedModelName].length - 1;
  return context.server.db[camelizedModelName][createdModelIndex];
}
