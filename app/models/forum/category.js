import classic from 'ember-classic-decorator';
import Model, { hasMany, attr } from '@ember-data/model';

@classic
export default class Category extends Model {
  // Properties
  @attr('string')
  name;

  // Relations
  @hasMany('forum/thread')
  threads;

  @attr('number')
  amountOfThreads;
}
