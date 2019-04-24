import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  question: belongsTo('form-open-question'),
  response: belongsTo('form-response')
});
