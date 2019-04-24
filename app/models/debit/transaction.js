import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  description: attr('string'),
  amount: attr('number'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  user: belongsTo('user'),
  collection: belongsTo('debit/collection')
});
