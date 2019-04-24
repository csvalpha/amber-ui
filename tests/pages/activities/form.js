import {
  fillable,
  clickable
} from 'ember-cli-page-object';
import formComponent from 'alpha-amber/tests/pages/components/form/form-form';

export default {
  form: formComponent,
  price: fillable('input#activity-form-price'),
  fillIn(values) {
    this
      .price(values.price)
      .form
      .title(values.title)
      .description(values.description);
    return this;
  },
  submit: clickable('input[type=submit]')
};
