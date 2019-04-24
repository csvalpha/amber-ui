import {
  text,
  isVisible
} from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';

export default {
  scope: testSelector('form-closed-alert'),
  alertTextStrong: text('strong.alert-text'),
  alertText: text('span.alert-text'),
  isVisible: isVisible()
};
