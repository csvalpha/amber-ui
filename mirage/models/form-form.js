import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  openQuestions: hasMany('form-open-question'),
  closedQuestions: hasMany('form-closed-question')
});
