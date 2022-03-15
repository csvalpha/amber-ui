import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyArticleCommentRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Artikel comment verwijderen' };

  canAccess() {
    return this.abilities.can('destroy article-comments');
  }

  model(params) {
    return this.store.findRecord('article-comment', params.id, params);
  }
}
