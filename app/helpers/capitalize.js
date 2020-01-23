import { helper } from '@ember/component/helper';
import { capitalize as emberCapitalize } from '@ember/string';

export function capitalize([text]) {
  return emberCapitalize(text);
}

export default helper(capitalize);
