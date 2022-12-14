// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action } from '@ember/object';
import { ActivityCategories } from 'amber-ui/constants';
import { isNone } from '@ember/utils';
import { inject as service } from '@ember/service';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import EditController from '../application/edit';
import { union } from '../../utils/array-operations';

export default class EditActivityController extends EditController {
  successMessage = 'Activiteit opgeslagen!';
  successTransitionTarget = 'activities.show';

  @service session;
  @service abilities;

  _activityCategoryToOption(activityCategory) {
    return {
      value: activityCategory.toLowerCase().replace('ë', 'e'),
      label: activityCategory,
    };
  }

  get combinedErrors() {
    const combined = union(
      this.model.errors.content,
      this.model.form?.get('errors')?.content
    );
    return combined.length > 0 ? combined : null;
  }

  get activityHasForm() {
    return !isNone(this.model.form.content);
  }

  set activityHasForm(value) {
    if (value) {
      const form = this.store.createRecord('form/form');
      this.store.createRecord('form/open-question', {
        form,
        question: 'Opmerkingen',
        fieldType: 'text',
        position: 0,
      });
      this.model.form = form;
    } else {
      this.model.form = null;
    }
  }

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

  @action
  setContent(content) {
    this.model.description = content;
  }
}
