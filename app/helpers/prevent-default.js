import { helper } from '@ember/component/helper';

export function preventDefault([functionToCall]) {
  return function (event) {
    event.preventDefault();
    functionToCall.apply(this, event, ...arguments);
  };
}

export default helper(preventDefault);
