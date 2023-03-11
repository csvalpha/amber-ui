import { none, alias } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['mb-3'],
  classNameBindings: ['usesGrid:row'],
  inputLayout: null,
  usesGrid: none('inputLayout'),
  labelClass: 'col-sm-2',
  inputWrapperClass: 'col-sm-10',
  inputValidityClass: computed('isInvalid', function () {
    return this.isInvalid ? 'is-invalid' : '';
  }),
  type: 'text',
  model: null,
  label: null,
  property: null,
  disabled: false,
  required: false,
  inputGroup: false,
  isInvalid: computed('model.errors.[]', 'property', function () {
    return this.get(`model.errors.${this.property}.length`) > 0;
  }),
  inputIdentifier: computed(
    'model.constructor.modelName',
    'property',
    function () {
      // See http://stackoverflow.com/questions/34864580/ember-data-model-getmodelname-is-undefined-but-model-internalmodel-works
      // On why model.constructor.modelName is used instead of model.modelName
      return `${this.model.constructor.modelName}-form-${this.property}`;
    }
  ),
  placeholder: alias('label'),
});
