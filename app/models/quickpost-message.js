import Model, { belongsTo, attr } from '@ember-data/model';

export default Model.extend({
  message: attr('string'),
  author: belongsTo('user'),
  createdAt: attr('date')
});
