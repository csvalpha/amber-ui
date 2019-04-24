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
    return this.get('groupValue').includes(this.get('value'));
  }).readOnly(),
  change() {
    const value = this.get('value');
    const groupValue = this.get('groupValue');
    assert(`Group value of a checkbox group (name=${this.get('name')}) should be an array!`, isArray(groupValue));
    if (groupValue.includes(value)) {
      groupValue.removeObject(value);
    } else {
      groupValue.pushObject(value);
    }
    this.set('groupValue', groupValue);
  }
});
