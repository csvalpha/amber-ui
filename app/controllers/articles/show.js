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
        const articleComment = this.store.createRecord('articleComment', {
          content: this.newArticleComment,
          article: this.model,
          user: this.session.get('currentUser')
        });
        articleComment.save().then(() => {
          this.flashNotice.sendSuccess('Reactie opgeslagen!');
        });
        this.set('newArticleComment', '');
      }
    }
  }
});
