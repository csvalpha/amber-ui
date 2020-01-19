import Helper from '@ember/component/helper';

export function range([first, last]) {
  const range = [];
  for (let i = first; i < last; ++i) {
    range.push(i);
  }

  return range;
}

export default Helper.helper(range);
