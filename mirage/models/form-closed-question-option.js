import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  question: belongsTo('form-closed-question'),
  answers: hasMany('form-closed-question-answer')
});
