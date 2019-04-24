import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  form: belongsTo('form-form'),
  options: hasMany('form-closed-question-option'),
  isMultipleChoice() {
    return this.fieldType === 'checkbox';
  }
});
