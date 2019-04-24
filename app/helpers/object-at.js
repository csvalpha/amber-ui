import Helper from '@ember/component/helper';

export default Helper.helper(([array, index]) => {
  return array.objectAt(index);
});
