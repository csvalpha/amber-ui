import { none } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['form-group'],
  classNameBindings: ['usesGrid:form-row'],
  inputLayout: null,
  usesGrid: none('inputLayout'),
  labelClass: 'col-sm-2',
  inputWrapperClass: 'col-sm-10',
  inputValidityClass: computed('isInvalid', function() {
    return this.isInvalid ? 'is-invalid' : '';
  }),
  type: 'text',
  model: null,
  label: null,
  property: null,
  disabled: false,
  required: false,
  isInvalid: computed('model.errors.[]', function() {
    return this.get(`model.errors.${this.property}.length`) > 0;
  }),
  inputIdentifier: computed('property', function() {
    // See http://stackoverflow.com/questions/34864580/ember-data-model-getmodelname-is-undefined-but-model-internalmodel-works
    // On why model.constructor.modelName is used instead of model.modelName
    return `${this.get('model.constructor.modelName')}-form-${this.property}`;
  }),
  placeholder: computed.alias('label')
});
