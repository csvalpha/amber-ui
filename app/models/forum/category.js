import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  // Properties
  name: attr('string'),

  // Relations
  threads: hasMany('forum/thread'),
  amountOfThreads: attr('number')
});
