import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class ForumPostDestroyController extends DestroyController {
  successMessage = 'Forumbericht verwijderd!';
  successTransitionTarget = 'forum.categories.category.threads.thread.show';
  cancelTransitionTarget = 'forum.categories.category.threads.thread.show';

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
