import NewController from 'amber-ui/controllers/application/new';
import { action } from '@ember/object';

export default class NewThreadController extends NewController {
  successTransitionTarget = 'forum.categories.category.threads.thread.show';
  cancelTransitionTarget = 'forum.categories.category.show';
  get cancelTransitionModel() {
    return this.category;
  }

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

  @action
  async cancel() {
    this.category = await this.model.category;
  }
}
