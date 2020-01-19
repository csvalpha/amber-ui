import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import $ from 'jquery';
import { ActivityCategories } from 'alpha-amber/constants';

export default Controller.extend({
  session: service(),
  checkedAll: computed(function() {
    const categorySelector = $('#activityCategoryForm');
    return categorySelector.find('input:checked').length === categorySelector.find('input').length;
  }),

  categoriesParams: computed(function() {
    const form = $('#activityCategoryForm');
    const selected = [];
    form.serializeArray()
      .filter((el) => el.value === 'on')
      .forEach((el, index) => {
        selected[index] = el.name;
      });
    return `categories=${selected.join(',')}`;
  }),

  iCalBase: computed('session.currentUser.icalSecretKey', 'session.currentUser.id', function() {
    return `/ical/activities?key=${this.get('session.currentUser.icalSecretKey')}&user_id=${this.get('session.currentUser.id')}`;
  }),

  iCalURL: computed('iCalBase', 'categoriesParams', function() {
    return `${window.location.origin}${this.iCalBase}&${this.categoriesParams}`;
  }),

  webcalURL: computed('iCalBase', 'categoriesParams', function() {
    return `webcal://${window.location.host}${this.iCalBase}&${this.categoriesParams}`;
  }),

  _activityCategoryToOption: activityCategory => {
    return {
      value: activityCategory.toLowerCase().replace('ë', 'e'),
      label: activityCategory
    };
  },

  activityCategoryOptions: computed(function() {
    return ActivityCategories.map(this._activityCategoryToOption);
  }),

  actions: {
    updateICalURL() {
      this.notifyPropertyChange('categoriesParams');
    },
    toggleCheckAll() {
      const form = $('#activityCategoryForm');
      this.checkedAll;

      if (this.checkedAll) {
        form.find(':checkbox').prop('checked', false);
      } else {
        form.find(':checkbox').prop('checked', true);
      }

      this.notifyPropertyChange('categoriesParams');
      this.notifyPropertyChange('checkedAll');
    }
  }
});
