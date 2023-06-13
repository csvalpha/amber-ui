import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';

export default class PostEditController extends EditController {
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

  @action
  setContent(content) {
    this.model.message = content;
  }
}
