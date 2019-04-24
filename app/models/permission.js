import { computed } from '@ember/object';
import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  // Properties
  name: attr('string'),

  // Computed properties
  model: computed('name', function() {
    return this.get('name').split('.')[0];
  }),
  action: computed('name', function() {
    return this.get('name').split('.')[1];
  })
});
