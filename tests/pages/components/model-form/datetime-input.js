import {
  attribute,
  collection,
  hasClass,
  fillable,
  property,
  text,
  value
} from 'ember-cli-page-object';

export default {
  fillIn: fillable('input'),
  value: value('input'),
  label: text('label'),
  dateInputPlaceholder: attribute('placeholder', 'input', { at: 0 }),
  dateInputId: attribute('id', 'input', { at: 0 }),
  timeInputId: attribute('id', 'input', { at: 1 }),
  dateInputType: property('type', 'input', { at: 0 }),
  isDateInputDisabled: property('disabled', 'input', { at: 0 }),
  isTimeInputDisabled: property('disabled', 'input', { at: 1 }),
  isDateInputRequired: property('required', 'input', { at: 0 }),
  isTimeInputRequired: property('required', 'input', { at: 1 }),
  labelFor: attribute('for', 'label'),
  isInvalid: hasClass('is-invalid', 'input', { at: 0 }),
  errors: collection({
    itemScope: '.invalid-feedback div',
    item: {}
  })
};
