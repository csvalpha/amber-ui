import {
  fillable,
  clickable
} from 'ember-cli-page-object';

export default {
  title: fillable('input#article-form-title'),
  content: fillable('textarea#article-form-content'),
  fillIn(values) {
    return this
      .title(values.title)
      .content(values.content);
  },
  submit: clickable('input[type=submit]')
};
