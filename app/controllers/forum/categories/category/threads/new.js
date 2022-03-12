import NewController from 'alpha-amber/controllers/application/new';
import { action } from '@ember/object';
import { isNone } from '@ember/utils';
import { inject as service } from '@ember/service';

export default class NewThreadController extends NewController {
  @service('flash-notice') flashNotice;

  successTransitionTarget = 'forum.categories.category.threads.thread';

  routeIsNew = true;
  content = '';

  @action
  onSuccess() {
    // Reload thread to update thread.amountOfPosts
    this.model.thread.reload();
    // Reload category to update category.amountOfThreads
    this.model.category.reload();
  }

  @action
  submit() {
    this.set('errorMessage', null);
    const { thread } = this.model;
    const { post } = this.model;

    if (isNone(post.get('message'))) {
      this.set('errorMessage', 'Je moet eerst een bericht aanmaken');
      return;
    }

    if (!isNone(thread)) {
      thread
        .save()
        .then((savedModel) => {
          post
            .save()
            .then(() => {
              this.send('onSuccess', savedModel);
            })
            .catch((error) => {
              this.send('onError', error);
            });
        })
        .catch((error) => {
          this.send('onError', error);
        });
    }
  }
}
