import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  form: belongsTo('form-form'),
  user: belongsTo(),
  openQuestionAnswers: hasMany('form-open-question-answer'),
  closedQuestionAnswers: hasMany('form-closed-question-answer')
});
