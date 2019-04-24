import {
  attribute, clickable, collection, hasClass, property, text, value
} from 'ember-cli-page-object';

export default {
  isInvalid: hasClass('is-invalid', 'input[type=radio]', { multiple: true }),
  label: text('legend'),
  options: collection({
    itemScope: '.form-check',
    item: {
      label: text('label'),
      labelFor: attribute('for', 'label'),
      inputId: attribute('id', 'input[type=radio]'),
      inputName: attribute('name', 'input[type=radio]'),
      value: value('input[type=radio]'),
      checked: property('checked', 'input[type=radio]'),
      required: property('required', 'input[type=radio]'),
      disabled: property('disabled', 'input[type=radio]'),
      check: clickable('input[type=radio]')
    }
  }),
  errors: collection({
    itemScope: '.invalid-feedback div'
  })
};
