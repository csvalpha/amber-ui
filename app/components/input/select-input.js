import Component from '@ember/component';

export default Component.extend({
  tagName: 'select',
  attributeBindings: ['required', 'disabled'],
  required: null,
  options: null,
  value: null,
  placeholder: null,
  change() {
    this.set('value', this.element.value);
  }
});
