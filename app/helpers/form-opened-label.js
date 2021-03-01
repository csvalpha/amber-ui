import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

export default class FormOpenedLabel extends Helper {
  @service intl;

  compute([form]) {
    const currentDateTime = new Date();

    let prefix = 'Sluit';
    let dateFromNow = moment(form.get('respondUntil')).fromNow();

    if (form.get('respondFrom') > currentDateTime) {
      prefix = 'Opent';
      dateFromNow = moment(form.get('respondFrom')).fromNow();
    } else if (form.get('respondUntil') < currentDateTime) {
      prefix = 'Sloot';
    }

    return `${prefix} ${dateFromNow}`;
  }
}
