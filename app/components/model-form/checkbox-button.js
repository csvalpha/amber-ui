import { assert } from '@ember/debug';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';

export default Component.extend({
  tagName: 'input',
  type: 'checkbox',
  groupValue: [],
  attributeBindings: [
    'checked',
    'disabled',
    'name',
    'required',
    'type',
    'value'
  ],
  checked: computed('groupValue', 'value', function() {
    return this.groupValue.includes(this.value);
  }).readOnly(),
  change() {
    const value = this.value;
    const groupValue = this.groupValue;
    assert(`Group value of a checkbox group (name=${this.name}) should be an array!`, isArray(groupValue));
    if (groupValue.includes(value)) {
      groupValue.removeObject(value);
    } else {
      groupValue.pushObject(value);
    }
    this.set('groupValue', groupValue);
  }
});
