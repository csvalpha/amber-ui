import {
  attribute,
  fillable,
  value
} from 'ember-cli-page-object';

export default {
  questionId: attribute('data-test-open-question'),
  value: value(':input'),
  fillInValue: fillable(':input')
};
