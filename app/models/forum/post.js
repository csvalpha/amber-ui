import { computed } from '@ember/object';
import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  // Properties
  message: attr('string'),
  messageCamofied: attr('string'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  // Relations
  author: belongsTo('user'),
  thread: belongsTo('forum/thread'),

  // Computed properties
  isUpdated: computed('createdAt', 'updatedAt', function() {
    return moment(this.updatedAt).isAfter(this.createdAt);
  })
});
