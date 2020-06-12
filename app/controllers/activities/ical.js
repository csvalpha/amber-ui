import Controller from '@ember/controller';
import { computed, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { ActivityCategories } from 'alpha-amber/constants';

export default class IcalController extends Controller {
  @service session;

  activityCategoryOptions;

  constructor() {
    super(...arguments);
    set(this, 'activityCategoryOptions', ActivityCategories.map(this._activityCategoryToOption));
  }

  @computed('activityCategoryOptions.@each.checked')
  get categoriesParams() {
    const selected = this.activityCategoryOptions
      .filter((category) => category.checked)
      .map((category) => category.value);
    return `categories=${selected.join(',')}`;
  }

  @computed('session.currentUser', 'session.currentUser.icalSecretKey').readOnly()
  get iCalBase() {
    return `/ical/activities?key=${this.session.currentUser.icalSecretKey}&user_id=${this.session.currentUser.id}`;
  }

  @computed('iCalBase', 'categoriesParams').readOnly()
  get iCalURL() {
    return `${window.location.origin}${this.iCalBase}&${this.categoriesParams}`;
  }

  @computed('iCalURL').readOnly()
  get webcalURL() {
    return `webcal://${window.location.host}${this.iCalBase}&${this.categoriesParams}`;
  }

  _activityCategoryToOption(activityCategory) {
    return {
      value: activityCategory.toLowerCase().replace('ë', 'e'),
      label: activityCategory,
      checked: true
    };
  }
}
