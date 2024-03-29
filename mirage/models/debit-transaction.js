import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  user: belongsTo('user'),
  collection: belongsTo('debit/collection'),
});
