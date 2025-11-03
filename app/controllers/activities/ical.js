import EditController from 'amber-ui/controllers/application/edit';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { ActivityCategories } from 'amber-ui/constants';
import { tracked } from '@glimmer/tracking';

export default class ActivitiesIcalController extends EditController {
  @service session;
  @tracked activityCategoryOptions;

  constructor() {
    super(...arguments);
    this.activityCategoryOptions = ActivityCategories.map(
      this._activityCategoryToOption
    );
    this.activityCategoryOptions.push({
      value: 'birthdays',
      label: 'Verjaardagen',
      checked: false,
    });
  }

  @computed('activityCategoryOptions.@each.checked')
  get categoriesParams() {
    return this.activityCategoryOptions
      .filter((category) => category.checked)
      .map((category) => category.value);
  }

  get iCalBase() {
    return `/ical/activities?key=${this.session.currentUser.icalSecretKey}&user_id=${this.session.currentUser.id}`;
  }

  get iCalURL() {
    return `${window.location.origin}${this.iCalBase}`;
  }

  get webcalURL() {
    return `webcal://${window.location.host}${this.iCalBase}`;
  }

  _activityCategoryToOption(activityCategory) {
    return {
      value: activityCategory.toLowerCase().replace('ë', 'e'),
      label: activityCategory,
      checked: true,
    };
  }

  saveCategories = () => {
    const { currentUser } = this.session;
    const selectedCategories = this.categoriesParams;

    currentUser.set('icalCategories', selectedCategories);

    return currentUser
      .save()
      .then(() => {
        this.flashNotice.sendSuccess('Categorieën succesvol opgeslagen!');
      })
      .catch((error) => {
       this.flashNotice.sendError(
          'Er ging iets fout bij het opslaan van je categorieën.'
        );
        console.error('Failed to save categories:', error);
      });
  };
}
