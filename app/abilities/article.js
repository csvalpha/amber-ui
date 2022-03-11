import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default class Article extends Ability {
  get canCreate() {
    return this.session.hasPermission('article.create');
  }

  canShow = true;

  get canDestroy() {
    return this.session.hasPermission('article.destroy');
  }

  get canSelectAllGroups() {
    return this.session.hasPermission('article.update');
  }

  get canShowArticleComments() {
    return (
      this.session.hasPermission('article-comment.read') ||
      this.model.publiclyVisible
    );
  }

  get canEdit() {
    return (
      this.session.hasPermission('article.update') ||
      this.isArticleOwner(this.model)
    );
  }

  isArticleOwner(article) {
    // This can be reached while not logged in: when a user visits a public article, this method is called to
    // determine whether to show the edit button

    const { currentUser } = this.session;
    return !isNone(currentUser) && article.isOwner(currentUser);
  }
}
