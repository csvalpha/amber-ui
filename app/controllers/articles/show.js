import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ShowArticleController extends Controller {
  @service session;
  @service flashNotice;
  @tracked newArticleComment = '';
  get sortedArticleComments() {
    return this.model.comments.sortBy('createdAt');
  }

  @action
  submitArticleComment() {
    if (this.newArticleComment.trim().length > 0) {
      const articleComment = this.store.createRecord('articleComment', {
        content: this.newArticleComment,
        article: this.model,
        user: this.session.get('currentUser'),
      });
      articleComment.save().then(() => {
        this.flashNotice.sendSuccess('Reactie opgeslagen!');
      });
      this.newArticleComment = '';
    }
  }
}
