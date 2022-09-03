import NewController from 'amber-ui/controllers/application/new';
import { action } from '@ember/object';
import { isNone } from '@ember/utils';
import { inject as service } from '@ember/service';

export default class NewThreadController extends NewController {

  successTransitionTarget = 'forum.categories.category.threads.thread.show';
  cancelTransitionTarget = 'forum.categories.category.show';
  cancelTransitionModel = this.model?.category;

  @action
  async submit() {
    this.errorMessage = null;
    try {
      const savedModel = await this.model.saveWithFirstPost();
      this.modelSaveUtil.onSuccess(savedModel);
    } catch (error) {
      this.modelSaveUtil.onError(error);
    }
  }
}
