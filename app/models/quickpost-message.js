import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  message: attr('string'),
  author: belongsTo('user'),
  createdAt: attr('date')
});
