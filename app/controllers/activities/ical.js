import Controller from '@ember/controller';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { ActivityCategories } from 'amber-ui/constants';
import { tracked } from '@glimmer/tracking';

export default class ActivitiesIcalController extends Controller {
  @service session;

  @tracked activityCategoryOptions;

  constructor() {
    super(...arguments);
    this.activityCategoryOptions = ActivityCategories.map(
      this._activityCategoryToOption
    );
  }

  @computed('activityCategoryOptions.@each.checked')
  get categoriesParams() {
    const selected = this.activityCategoryOptions
      .filter((category) => category.checked)
      .map((category) => category.value);
    return `categories=${selected.join(',')}`;
  }

  get iCalBase() {
    return `/ical/activities?key=${this.session.currentUser.icalSecretKey}&user_id=${this.session.currentUser.id}`;
  }

  get iCalURL() {
    return `${window.location.origin}${this.iCalBase}&${this.categoriesParams}`;
  }

  get webcalURL() {
    return `webcal://${window.location.host}${this.iCalBase}&${this.categoriesParams}`;
  }

  _activityCategoryToOption(activityCategory) {
    return {
      value: activityCategory.toLowerCase().replace('ë', 'e'),
      label: activityCategory,
      checked: true,
    };
  }
}
