import {
  clickable,
  isVisible
} from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';
import responseForm from './response-form';

export default {
  scope: testSelector('form-response-card'),
  isVisible: isVisible(),
  form: responseForm,
  submit: clickable(':submit')
};
