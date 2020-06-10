import Model, { hasMany, attr } from '@ember-data/model';

export default class Category extends Model {
  // Properties
  @attr('string') name;
  @attr('number') amountOfThreads;

  // Relations
  @hasMany('forum/thread') threads;
}
