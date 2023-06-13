import { Ability } from 'ember-can';

export default class ArticleComment extends Ability {
  get canShow() {
    return this.session.hasPermission('article-comment.read');
  }

  get canCreate() {
    return this.session.hasPermission('article-comment.create');
  }

  get canDestroy() {
    return this.session.hasPermission('article-comment.destroy');
  }
}
