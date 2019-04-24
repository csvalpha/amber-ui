import { findElement } from 'ember-cli-page-object/extend';

export default function checkbox(selector) {
  return function(value) {
    const inputElement = findElement(this, selector);
    const currentValue = inputElement.prop('checked');

    if (value !== currentValue) {
      inputElement.click();
    }
    return this;
  };
}
