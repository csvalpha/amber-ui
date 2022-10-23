import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class ForumThreadDestroyController extends DestroyController {
  successTransitionTarget = 'forum.categories.category';
  cancelTransitionTarget = 'forum.categories.category';
  successMessage = 'Topic verwijderd!';

  @action
  async destroyModel() {
    this.successTransitionModel = await this.model.category;
    super.destroyModel();
  }

  @action
  async cancel() {
    this.cancelTransitionModel = await this.model.category;
    super.cancel();
  }
}
