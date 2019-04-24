import {
  attribute,
  collection,
  hasClass,
  fillable,
  property,
  text,
  value
} from 'ember-cli-page-object';
import fillableDate from 'alpha-amber/tests/pages/helpers/fillable-date';

export default {
  fillIn: fillableDate('input', 'fillInValue'),
  fillInValue: fillable('input'),
  value: value('input'),
  label: text('label'),
  placeholder: attribute('placeholder', 'input'),
  inputId: attribute('id', 'input'),
  inputType: property('type', 'input'),
  isDisabled: property('disabled', 'input'),
  isRequired: property('required', 'input'),
  labelFor: attribute('for', 'label'),
  isInvalid: hasClass('is-invalid', 'input', { at: 0 }),
  errors: collection({
    itemScope: '.invalid-feedback div',
    item: {}
  })
};
