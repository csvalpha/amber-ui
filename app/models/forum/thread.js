import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import DS from 'ember-data';

const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
  // Properties
  title: attr('string'),
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
      return (this.get('closedAt') === null);
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
