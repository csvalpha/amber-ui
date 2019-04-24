import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import NewController from 'alpha-amber/controllers/application/new';

export default NewController.extend({
  flashNotice: service('flash-notice'),
  successTransitionTarget: 'forum.categories.category.threads.thread',
  routeIsNew: true,
  content: '',
  actions: {
    onSuccess() {
      this._super(...arguments);
      // Reload thread to update thread.amountOfPosts
      this.get('model.thread').reload();
      // Reload category to update category.amountOfThreads
      this.get('model.category').reload();
    },
    submit() {
      this.set('errorMessage', null);
      const thread = this.get('model.thread');
      const post = this.get('model.post');

      if (isNone(post.get('message'))) {
        this.set('errorMessage', 'Je moet eerst een bericht aanmaken');
        return;
      }

      if (!isNone(thread)) {
        thread.save().then(savedModel => {
          post.save().then(() => {
            this.send('onSuccess', savedModel);
          }).catch(error => {
            this.send('onError', error);
          });
        }).catch(error => {
          this.send('onError', error);
        });
      }
    }
  }
});
