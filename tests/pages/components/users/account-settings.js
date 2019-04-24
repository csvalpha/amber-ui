import { fillable, value, property } from 'ember-cli-page-object';
import checkbox from 'alpha-amber/tests/pages/helpers/checkbox';

export default {
  loginEnabled: checkbox('input[data-test-input=loginEnabled]'),
  loginEnabledValue: property('checked', 'input[data-test-input=loginEnabled]'),
  username: fillable('input[data-test-input=username]'),
  usernameValue: value('input[data-test-input=username]'),

  fillIn(values) {
    return this
      .loginEnabled(values.loginEnabled)
      .username(values.username);
  }
};
