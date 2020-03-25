import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  // Properties
  name: attr('string'),

  // Computed properties
  model: computed('name', function() {
    return this.name.split('.')[0];
  }),
  action: computed('name', function() {
    return this.name.split('.')[1];
  })
});
