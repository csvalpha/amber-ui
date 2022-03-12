// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed } from '@ember/object';
import { ActivityCategories } from 'alpha-amber/constants';
import Controller from '@ember/controller';
import { isNone } from '@ember/utils';
import { inject as service } from '@ember/service';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { union } from '@ember/object/computed';

export default class EditActivityController extends Controller {
  @service session;
  @service store;
  @service abilities;
  @service('flash-notice') flashNotice;

  _activityCategoryToOption(activityCategory) {
    return {
      value: activityCategory.toLowerCase().replace('ë', 'e'),
      label: activityCategory
    };
  }

  @union('model.errors', 'model.form.errors')
  combinedErrors;

  @computed('model.form.content', {
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
    }
  })
  activityHasForm;

  @computed('session.currentUser', function() {
    if (this.abilities.can('select all groups for activities')) {
      return this.store.findAll('group');
    }

    return this.session.currentUser.get('groups');
  })
  groups;

  @computed('_activityCategoryToOption', function() {
    return ActivityCategories.map(this._activityCategoryToOption);
  })
  activityCategoryOptions;

  @action
  submit() {
    this.model.saveWithForm().then(savedActivity => {
      this.transitionToRoute('activities.show', savedActivity.id);
      this.flashNotice.sendSuccess('Activiteit opgeslagen!');
    }).catch(error => {
      this.set('errorMessage', error.message);
    });
  }

  @action
  coverPhotoLoaded(file) {
    this.model.set('coverPhoto', file.data);
  }
}
