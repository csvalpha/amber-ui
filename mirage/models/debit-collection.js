import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  author: belongsTo('user'),
  transactions: hasMany('debit/transaction')
});
