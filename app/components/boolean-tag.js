import Component from '@ember/component';
import { computed } from '@ember/object';

const BooleanTagComponent = Component.extend({
  tagName: 'span',
  classNames: ['badge'],
  classNameBindings: ['value:badge-success:badge-danger'],
  label: computed('value', function() {
    return this.get('value') ? 'Ja' : 'Nee';
  })
});

BooleanTagComponent.reopenClass({
  positionalParams: ['value']
});

export default BooleanTagComponent;
