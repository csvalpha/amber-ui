import { helper } from '@ember/component/helper';

export function isPhone([text]) {
  return /\d{10,}/.test(text.replace(/\s|-/g, ''));
}

export default helper(isPhone);
