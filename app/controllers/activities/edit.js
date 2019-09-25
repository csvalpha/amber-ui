import { inject as service } from '@ember/service';
import { union } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { CanMixin } from 'ember-can';
import { ActivityCategories } from 'alpha-amber/constants';

export default Controller.extend(CanMixin, {
  session: service(),
  store: service(),
  flashNotice: service('flash-notice'),
  combinedErrors: union('model.errors', 'model.form.errors'),
  activityHasForm: computed('model.form', {
    get() {
      return !isNone(this.get('model.form.content'));
    },
    set(_, value) {
      if (value) {
        const store = this.store;
        const form = store.createRecord('form/form');
        store.createRecord('form/open-question', { form, question: 'Opmerkingen', fieldType: 'text', position: 0 });
        this.set('model.form', form);
      } else {
        this.set('model.form', null);
      }
      return value;
    }
  }),

  groups: computed(function() {
    if (this.can('select all groups for activities')) {
      return this.store.findAll('group');
    }
    return this.get('session.currentUser').get('groups');
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
    submit() {
      const activity = this.model;
      const flashNotice = this.flashNotice;
      activity.saveWithForm().then(savedActivity => {
        this.transitionToRoute('activities.show', savedActivity.get('id'));
        flashNotice.sendSuccess('Activiteit opgeslagen!');
      }).catch(error => {
        this.set('errorMessage', error.message);
      });
    },

    coverPhotoLoaded(file) {
      const activity = this.model;
      activity.set('coverPhoto', file.data);
    }
  }
});
