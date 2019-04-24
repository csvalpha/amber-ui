import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  // Properties
  updatedAt: attr('date'),
  createdAt: attr('date'),
  content: attr('string'),

  // Relations
  author: belongsTo('user'),
  article: belongsTo('article')
});
