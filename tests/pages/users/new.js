import {
  clickable,
  create,
  visitable
} from 'ember-cli-page-object';

import form from './form';

export default create({
  visit: visitable('/users/new'),
  submit: clickable('input[type=submit]'),
  form
});
