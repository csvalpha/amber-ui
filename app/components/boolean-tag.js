import Component from '@ember/component';
import { computed } from '@ember/object';

const BooleanTagComponent = Component.extend({
  tagName: 'span',
  classNames: ['badge'],
  classNameBindings: ['value:badge-success:badge-danger'],
  label: computed('value', function () {
    switch (this.value) {
      case null:
        return 'Niet ingevuld';
      case true:
        return 'Ja';
      case false:
      default:
        return 'Nee';
    }
  }),
});

BooleanTagComponent.reopenClass({
  positionalParams: ['value'],
});

export default BooleanTagComponent;
