import Model, { belongsTo, attr } from '@ember-data/model';

export default Model.extend({
  // Properties
  updatedAt: attr('date'),
  createdAt: attr('date'),
  content: attr('string'),

  // Relations
  author: belongsTo('user'),
  photo: belongsTo('photo')
});
