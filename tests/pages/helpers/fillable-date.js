import { findElement } from 'ember-cli-page-object/extend';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';

export default function fillableDate(selector, fillableName) {
  return function(date) {
    const inputElement = findElement(this, selector);
    if (inputElement.prop('type') === 'date') {
      // Native date input field, fill in date
      this[fillableName](moment(date).format('YYYY-MM-DD'));
    } else {
      // Pikaday input, use date picker
      const interactor = openDatepicker(inputElement);

      // Some additional checking
      const year = date.getFullYear();
      /* global jQuery:false */
      const yearOption = jQuery(`${interactor.selectorForYearSelect} option[value=${year}]`);
      if (yearOption.length === 0) {
        throw new Error(
          `To spare you some nasty debugging: you want to select a year (${year}) using pikaday 
          for the input with selector '${selector}', but it is not in the possible options! 
          Try to change the date range in the factories, or set a more appropriate yearRange on the component.`
        );
      }

      interactor.selectDate(date);
    }
    return this;
  };
}
