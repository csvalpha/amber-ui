import Model, { belongsTo, attr } from '@ember-data/model';

export default Model.extend({
  description: attr('string'),
  amount: attr('number'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  user: belongsTo('user'),
  collection: belongsTo('debit/collection')
});
