import { helper } from '@ember/component/helper';
import { capitalize } from '@ember/string';

export function capitalizeTranslation([object]) {
  return capitalize(object.string);
}

export default helper(capitalizeTranslation);
