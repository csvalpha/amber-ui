import NewController from 'amber-ui/controllers/application/new';
import { action } from '@ember/object';
import { isNone } from '@ember/utils';
import { inject as service } from '@ember/service';

export default class NewThreadController extends NewController {
  @service('flash-notice') flashNotice;

  successTransitionTarget = 'forum.categories.category.threads.thread.show';
  cancelTransitionTarget = 'forum.categories.category.show';
  cancelTransitionModel = this.model?.thread?.category;

  content = '';

  @action
  onSuccess(savedModel) {
    // Reload thread to update thread.amountOfPosts
    savedModel.reload();
    // Reload category to update category.amountOfThreads
    savedModel.category.reload();
    // redirect
    this.modelSaveUtil.redirectSuccess(savedModel);
  }

  @action
  async submit() {
    this.errorMessage = null;
    const thread = await this.model;
    const post = thread.firstPost;

    if (isNone(post.message)) {
      this.set('errorMessage', 'Je moet eerst een bericht aanmaken');
      return;
    }

    if (!isNone(thread)) {
      try {
        const savedModel = await thread.save();
        await post.save();
        this.onSuccess(savedModel);
      } catch (error) {
        this.modelSaveUtil.onError(error);
      }
    }
  }
}
