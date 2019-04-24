import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  startDate: attr('date'),
  endDate: attr('date'),
  function: attr('string'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  user: belongsTo('user'),
  group: belongsTo('group'),

  administrative: alias('group.administrative'),
  userIsCurrentlyMember: computed('startDate', 'endDate', function() {
    const startDate = this.get('startDate');
    const endDate = this.get('endDate');

    return (startDate < moment.now() && (!endDate || endDate > moment.now()));
  })
});
