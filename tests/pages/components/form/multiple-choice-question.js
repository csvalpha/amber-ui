import {
  collection, value, property, clickable, text
} from 'ember-cli-page-object';

export default {
  options: collection({
    itemScope: '.form-check',
    item: {
      label: text('label'),
      value: value('input'),
      checked: property('checked', 'input'),
      check: clickable('input')
    }
  })
};
