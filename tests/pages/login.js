import {
  create,
  visitable,
  clickable,
  fillable,
  selectable,
  text
} from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';

export default create({
  visit: visitable('/login'),
  username: fillable('input#field-username'),
  password: fillable('input#field-password'),
  rememberMe: selectable('input#field-remember-me'),
  error: text(testSelector('error')),
  login: clickable('button[type=submit]')
});
