import Helper from '@ember/component/helper';

export function difference([a, b]) {
  return Math.abs(a - b);
}

export default Helper.helper(difference);
