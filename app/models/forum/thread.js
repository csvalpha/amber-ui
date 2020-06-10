import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import Model, { belongsTo, hasMany, attr } from '@ember-data/model';

@classic
export default class Thread extends Model {
  // Properties
  @attr('string')
  title;

  @attr('date')
  closedAt;

  @attr('date')
  createdAt;

  @attr('date')
  updatedAt;

  // Relations
  @hasMany('forum/post')
  posts;

  @attr('number')
  amountOfPosts;

  @belongsTo('user')
  author;

  @belongsTo('forum/category')
  category;

  // Computed properties
  @sort('posts', 'sortDefinition')
  sortedPosts;

  sortDefinition = ['createdAt:asc'];

  @computed('closedAt')
  get isOpen() {
    return this.closedAt === null;
  }

  set isOpen(value) {
    if (value) {
      this.set('closedAt', null);
    } else {
      this.set('closedAt', new Date());
    }

    // return value;
  }
}
