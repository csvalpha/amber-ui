import Model, { belongsTo, hasMany, attr } from '@ember-data/model';

export default Model.extend({
  name: attr('string'),
  date: attr('date'),
  importFile: attr('raw'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  transactions: hasMany('debit/transaction'),
  author: belongsTo('user')
});
