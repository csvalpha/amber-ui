import TimeInputComponent from './time-input';
import { computed } from '@ember/object';
import moment from 'moment';
import { oneWay } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default TimeInputComponent.extend({
  media: service(),
  momentFieldsToUpdate: ['year', 'month', 'date'],
  showNativeDateInput: oneWay('media.isMobile'),

  // Format the date should be in for the native date input value
  // This is, as specified in http://w3c.github.io/html-reference/input.date.html#input.date.attrs.value, the full-date
  // format as defined in RFC 3339
  inputValueFormat: 'YYYY-MM-DD',

  // Format used to display the date in the pikaday input
  pikadayFormat: 'DD-MM-YYYY',
  pikadayI18n: computed(function () {
    return {
      previousMonth: 'Vorige maand',
      nextMonth: 'Volgende maand',
      months: moment.localeData()._months,
      weekdays: moment.localeData()._weekdays,
      weekdaysShort: moment.localeData()._weekdaysShort,
    };
  }),

  actions: {
    onPikadaySelection(selectedDate) {
      let date = moment(selectedDate);
      this.updateDateValue(date.add(date.utcOffset(), 'minutes'));
    },
  },
});
