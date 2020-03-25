import Model, { belongsTo, attr } from '@ember-data/model';
import { computed } from '@ember/object';

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
      return moment(this.endTime).format('HH:mm');
    },
    set(key, value) {
      this.set('endTime', moment(value, ['Hmm', 'HH:mm', 'H:mm']).toDate());
      return value;
    }
  }),

  label: computed('status', function() {
    return this.statusOptions[this.status];
  })
});
