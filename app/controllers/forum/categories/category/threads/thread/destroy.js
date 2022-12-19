import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class ThreadDestroyController extends DestroyController {
  successMessage = 'Topic verwijderd!';
  successTransitionTarget = 'forum.categories.category';
  cancelTransitionTarget = 'forum.categories.category.threads.thread';

  get successTransitionModel() {
    return this.category;
  }

  get cancelTransitionModel() {
    return this.thread;
  }

  @action
  async destroyModel() {
    this.category = await this.model.category;
    super.destroyModel();
  }

  @action
  async cancel() {
    this.thread = await this.model.thread;
    super.cancel();
  }
}
