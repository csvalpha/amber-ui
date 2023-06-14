import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';
import { union } from 'amber-ui/utils/array-operations';

export default class PollEditController extends EditController {
  successMessage = 'Poll opgeslagen!';
  successTransitionTarget = 'polls.poll';

  @action
  async submit() {
    await this.modelSaveUtil.saveModelWithForm(this.model);
  }

  get combinedErrors() {
    const combined = union(
      this.model.errors.content,
      this.model.form?.get('errors')?.content
    );
    return combined.length > 0 ? combined : null;
  }
}
