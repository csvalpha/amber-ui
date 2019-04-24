import { computed } from '@ember/object';
import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({

  statusOptions: {
    present: 'Aanwezig',
    busy: 'Bezig',
    absent: 'Afwezig'
  },

  // Properties
  startTime: attr('date'),
  endTime: attr('date'),
  status: attr('string'),

  // Relations
  user: belongsTo('user'),

  formattedEndTime: computed('endTime', {
    get() {
      return moment(this.get('endTime')).format('HH:mm');
    },
    set(key, value) {
      this.set('endTime', moment(value, ['Hmm', 'HH:mm', 'H:mm']).toDate());
      return value;
    }
  }),

  label: computed('status', function() {
    return this.get('statusOptions')[this.get('status')];
  })
});
