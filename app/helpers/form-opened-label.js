import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

export default Helper.extend({
  intl: service(),
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
});
