import {
  attribute, clickable, collection, hasClass, property, text, value
} from 'ember-cli-page-object';

export default {
  isInvalid: hasClass('is-invalid', 'input[type=checkbox]', { multiple: true }),
  label: text('legend'),
  options: collection({
    itemScope: '.form-check',
    item: {
      label: text('label'),
      labelFor: attribute('for', 'label'),
      inputId: attribute('id', 'input[type=checkbox]'),
      inputName: attribute('name', 'input[type=checkbox]'),
      value: value('input[type=checkbox]'),
      checked: property('checked', 'input[type=checkbox]'),
      required: property('required', 'input[type=checkbox]'),
      disabled: property('disabled', 'input[type=checkbox]'),
      check: clickable('input[type=checkbox]')
    }
  }),
  errors: collection({
    itemScope: '.invalid-feedback div'
  })
};
