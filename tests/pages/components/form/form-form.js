import {
  fillable
} from 'ember-cli-page-object';

export default {
  title: fillable('input#form\\/form-form-title'),
  description: fillable('input#form\\/form-form-description'),
  respondFrom: fillable('input#form\\/form-form-respondFrom'),
  respondUntil: fillable('input#form\\/form-form-respondUntil')
};
