import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  user: belongsTo(),
  partner: belongsTo('person')
});
