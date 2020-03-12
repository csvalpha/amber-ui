import Model, { belongsTo, attr } from '@ember-data/model';
import { computed } from '@ember/object';

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
