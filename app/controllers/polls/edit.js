import EditController from '../application/edit';
import { action } from '@ember/object';
import { union } from '../../utils/array-operations';

export default class EditPollController extends EditController {
  successMessage = 'Poll opgeslagen!';
  successTransitionTarget = 'polls.show';

  @action
  async submit() {
    await this.modelSaveUtil.saveModelWithForm(this.model);
  }

  get combinedErrors() {
    const combined = union(this.model.errors.content, this.model.form?.get('errors')?.content);
    return combined.length > 0 ? combined : null;
  }
}
