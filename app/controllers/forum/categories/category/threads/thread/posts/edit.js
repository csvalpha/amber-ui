import { action } from '@ember/object';
import EditController from 'amber-ui/controllers/application/edit';

export default class EditPostController extends EditController {
  successMessage = 'Forumbericht aangepast!';
  successTransitionTarget = 'forum.categories.category.threads.thread';
  get successTransitionModel() {
    return this.thread;
  }

  @action
  async submit() {
    this.thread = await this.model.thread;
    super.submit();
  }

  @action
  async cancel() {
    this.thread = await this.model.thread;
    super.cancel();
  }
}
