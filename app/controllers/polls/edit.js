import EditController from '../application/edit';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { union } from '@ember/object/computed';

export default class EditPollController extends EditController {
  successMessage = 'Poll opgeslagen!';
  successTransitionTarget = 'polls.show';

  @action
  async submit() {
    await this.modelSaveUtil.saveModelWithForm(this.model);
  }
  @union('model.errors', 'model.form.errors')
  combinedErrors;
}
