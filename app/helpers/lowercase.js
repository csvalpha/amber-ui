import Helper from '@ember/component/helper';

export function lowercase([stringValue]) {
  return stringValue.toLowerCase();
}

export default Helper.helper(lowercase);
