import NewController from 'amber-ui/controllers/application/new';
import { action } from '@ember/object';

export default class NewThreadController extends NewController {
  successTransitionTarget = 'forum.categories.category.threads.thread.show';
  cancelTransitionTarget = 'forum.categories.category.show';
  cancelTransitionModel = this.model?.category;

  @action
  async submit() {
    this.errorMessage = null;
    try {
      await this.model.saveWithFirstPost();
      this.modelSaveUtil.onSuccess();
    } catch (error) {
      this.modelSaveUtil.onError(error);
    }
  }
}
