import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class ForumThreadDestroyController extends DestroyController {
  successTransitionTarget = 'forum.categories.category';
  cancelTransitionTarget = 'forum.categories.category.threads.thread';
  successMessage = 'Topic verwijderd!';

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
