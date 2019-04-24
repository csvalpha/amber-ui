import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  form: belongsTo('form-form'),
  answers: hasMany('form-open-question-answer')
});
