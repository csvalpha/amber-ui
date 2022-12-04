import TextField from '@ember/component/text-field';
import { computed } from '@ember/object';
import moment from 'moment';

export default TextField.extend({
  tagName: 'span',
  type: 'time',
  momentFieldsToUpdate: ['hour', 'minute'],
  // Format the time should be in for the time input value
  // This is, as specified in http://w3c.github.io/html-reference/input.time.html#input.time.attrs.value, the partial-time
  // format as defined in RFC 3339
  inputValueFormat: 'HH:mm',
  // Transforms the Date object to string and vice versa
  inputValue: computed('dateValue', 'inputValueFormat', {
    get() {
      const format = this.inputValueFormat;
      return moment(this.dateValue).format(format);
    },
    set(key, inputValue) {
      const format = this.inputValueFormat;
      const updatedMomentValue = moment(inputValue, format);
      this.updateDateValue(updatedMomentValue);
      return inputValue;
    },
  }),
  updateDateValue(updatedMomentValue) {
    let momentValue = moment(this.dateValue);

    if (momentValue.isValid() && this.type != 'date') {
      this.updateMomentDateValue(momentValue, updatedMomentValue);
    } else {
      momentValue = updatedMomentValue;
    }

    this.set('dateValue', momentValue.toDate());
  },
  updateMomentDateValue(momentValue, updatedMomentValue) {
    this.momentFieldsToUpdate.forEach((fieldName) => {
      momentValue.set(fieldName, updatedMomentValue.get(fieldName));
    });
  },
});
