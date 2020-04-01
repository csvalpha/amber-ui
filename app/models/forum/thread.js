import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Model.extend({
  // Properties
  title: attr('string'),
  read: attr('boolean'),
  closedAt: attr('date'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  // Relations
  posts: hasMany('forum/post'),
  amountOfPosts: attr('number'),
  author: belongsTo('user'),
  category: belongsTo('forum/category'),

  // Computed properties
  sortedPosts: sort('posts', 'sortDefinition'),
  sortDefinition: ['createdAt:asc'],
  isOpen: computed('closedAt', {
    get() {
      return this.closedAt === null;
    },
    set(_key, value) {
      if (value) {
        this.set('closedAt', null);
      } else {
        this.set('closedAt', new Date());
      }

      return value;
    }
  })
});
