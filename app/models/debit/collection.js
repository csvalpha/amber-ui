import DS from 'ember-data';

const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
  name: attr('string'),
  date: attr('date'),
  importFile: attr('raw'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  transactions: hasMany('debit/transaction'),
  author: belongsTo('user')
});
