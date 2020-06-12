import Model, { hasMany, attr } from '@ember-data/model';

export default Model.extend({
  // Properties
  name: attr('string'),

  // Relations
  threads: hasMany('forum/thread'),
  amountOfThreads: attr('number')
});
