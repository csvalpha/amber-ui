import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service(),
  flashNotice: service('flash-notice'),
  newArticleComment: '',
  articleCommentSorting: ['createdAt'],
  sortedArticleComments: sort('model.comments', 'articleCommentSorting'),
  actions: {
    submitArticleComment() {
      if (this.newArticleComment.trim().length > 0) {
        const articleComment = this.get('store').createRecord('articleComment', {
          content: this.get('newArticleComment'),
          article: this.model,
          user: this.get('session').get('currentUser')
        });
        const flashNotice = this.get('flashNotice');
        articleComment.save().then(() => {
          flashNotice.sendSuccess('Reactie opgeslagen!');
        });
        this.set('newArticleComment', '');
      }
    }
  }
});
