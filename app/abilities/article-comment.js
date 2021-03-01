import { Ability } from 'ember-can';

export default class ArticleComment extends Ability {
  get canCreate() {
    return this.session.hasPermission('article-comment.create');
  }

  get canDestroy() {
    return this.session.hasPermission('article-comment.destroy');
  }
}
