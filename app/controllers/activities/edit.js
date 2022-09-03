// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed } from '@ember/object';
import { ActivityCategories } from 'amber-ui/constants';
import { isNone } from '@ember/utils';
import { inject as service } from '@ember/service';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { union } from '@ember/object/computed';
import EditController from '../application/edit';

//todo: refactor below class to extend EditController
export default class EditActivityController extends EditController {
  @service session;
  successTransitionTarget = 'activities.show';
  successTransitionModel = this.model;
  successMessage = 'Activiteit opgeslagen!';
  @service abilities;

  _activityCategoryToOption(activityCategory) {
    return {
      value: activityCategory.toLowerCase().replace('ë', 'e'),
      label: activityCategory,
    };
  }

  // todo: do we want to get rid of @union ? idk how to octane this
  @union('model.errors', 'model.form.errors')
  combinedErrors;

  // todo: refactor computed
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
    },
  })
  activityHasForm;

  get groups() {
    if (this.abilities.can('select all groups for activities')) {
      return this.store.findAll('group');
    }
    return this.session.currentUser.get('groups');
  }

  get activityCategoryOptions() {
    return ActivityCategories.map(this._activityCategoryToOption);
  }

  @action
  submit() {
    this.modelSaveUtil.saveModelWithForm(this.model);
  }

  @action
  coverPhotoLoaded(file) {
    this.model.set('coverPhoto', file.data);
  }
}
