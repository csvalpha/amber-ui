import { inject as service } from '@ember/service';
import { union } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { ActivityCategories } from 'alpha-amber/constants';

export default Controller.extend({
  session: service(),
  store: service(),
  abilities: service(),
  flashNotice: service('flash-notice'),
  combinedErrors: union('model.errors', 'model.form.errors'),
  activityHasForm: computed('model.form.content', {
    get() {
      return !isNone(this.model.form.content);
    },
    set(_, value) {
      if (value) {
        const form = this.store.createRecord('form/form');
        this.store.createRecord('form/open-question', {
          form,
          question: 'Opmerkingen',
          fieldType: 'text',
          position: 0,
        });
        this.set('model.form', form);
      } else {
        this.set('model.form', null);
      }

      return value;
    },
  }),

  groups: computed('session.currentUser', function () {
    if (this.abilities.can('select all groups for activities')) {
      return this.store.findAll('group');
    }

    return this.session.currentUser.get('groups');
  }),

  _activityCategoryToOption: (activityCategory) => {
    return {
      value: activityCategory.toLowerCase().replace('ë', 'e'),
      label: activityCategory,
    };
  },

  activityCategoryOptions: computed('_activityCategoryToOption', function () {
    return ActivityCategories.map(this._activityCategoryToOption);
  }),

  actions: {
    submit() {
      this.model
        .saveWithForm()
        .then((savedActivity) => {
          this.transitionToRoute('activities.show', savedActivity.id);
          this.flashNotice.sendSuccess('Activiteit opgeslagen!');
        })
        .catch((error) => {
          this.set('errorMessage', error.message);
        });
    },

    coverPhotoLoaded(file) {
      this.model.set('coverPhoto', file.data);
    },
  },
});
