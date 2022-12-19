import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class PostDestroyController extends DestroyController {
  successMessage = 'Forumbericht verwijderd!';
  successTransitionTarget = 'forum.categories.category.threads.thread';
  cancelTransitionTarget = 'forum.categories.category.threads.thread';

  get successTransitionModel() {
    return this.thread;
  }

  get cancelTransitionModel() {
    return this.thread;
  }

  @action
  async cancel() {
    this.thread = await this.model.thread;
    super.cancel();
  }

  @action
  async destroyModel() {
    this.thread = await this.model.thread;
    super.destroyModel();
  }
}
