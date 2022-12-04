import { helper } from '@ember/component/helper';

export function isUrl([text]) {
  return /^https?:\/\//.test(text);
}

export default helper(isUrl);