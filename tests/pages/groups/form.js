import {
  fillable,
  selectable,
  clickable
} from 'ember-cli-page-object';

export default {
  name: fillable('input#group-form-name'),
  description: fillable('textarea#group-form-description'),
  kind: selectable('select#group-form-kind'),
  recognizedAtGma: fillable('input#group-form-recognizedAtGma'),
  rejectedAtGma: fillable('input#group-form-rejectedAtGma'),

  fillIn(values) {
    return this
      .name(values.name)
      .description(values.description)
      .kind(values.kind)
      .recognizedAtGma(values.recognizedAtGma)
      .rejectedAtGma(values.rejectedAtGma);
  },

  submit: clickable('input[type=submit]')
};
