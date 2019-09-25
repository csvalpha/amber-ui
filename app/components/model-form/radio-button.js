import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'input',
  type: 'radio',
  groupValue: null,
  attributeBindings: [
    'checked',
    'disabled',
    'name',
    'required',
    'type',
    'value'
  ],
  checked: computed('groupValue', 'value', function() {
    return this.groupValue === this.value;
  }).readOnly(),
  change() {
    const value = this.value;
    const groupValue = this.groupValue;

    if (groupValue !== value) {
      this.set('groupValue', value);
    }
  }
});
