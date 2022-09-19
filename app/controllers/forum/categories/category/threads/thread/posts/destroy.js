import DestroyController from 'amber-ui/controllers/application/destroy';
imprt {action } from '@ember/objects';

export default class ForumPostDestroyController extends DestroyController {
  successMessage = 'Forumbericht verwijderd!';
  successTransitionTarget = 'forum.categories.category.threads.thread.show';
  cancelTransitionTarget = 'forum.categories.category.threads.thread.show';

  @action
  async cancel() {
    this.cancelTransitionModel = await this.model.thread;
    super.cancel();
  }

  @action
  async destroyModel() {
    this.successTransitionModel = await this.model.thread;
    super.destroyModel();
  }
}
