import {
  attribute, collection, value, property, text
} from 'ember-cli-page-object';
import checkbox from 'alpha-amber/tests/pages/helpers/checkbox';

export default {
  questionId: attribute('data-test-closed-question'),
  options: collection({
    itemScope: '.form-check',
    item: {
      label: text('label'),
      value: value('input'),
      checked: property('checked', 'input'),
      check: checkbox('input')
    }
  })
};
