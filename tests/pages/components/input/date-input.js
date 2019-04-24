import { fillable, findElement, value } from 'ember-cli-page-object';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';

export default {
  fillInCustomDatepicker(date) {
    const interactor = openDatepicker(findElement(this, 'input'));
    interactor.selectDate(date);
    return this;
  },
  fillInValue: fillable('input'),
  value: value('input')
};
