import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  option: belongsTo('form-closed-question-option'),
  response: belongsTo('form-response')
});
