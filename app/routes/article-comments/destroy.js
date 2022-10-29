import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyArticleCommentRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Artikel comment verwijderen' };

  canAccess() {
    return this.abilities.can('destroy article-comments');
  }

  async model(params) {
    const articleComment = this.store.findRecord(
      'article-comment',
      params.id,
      params
    );
    await articleComment.article;
    return articleComment;
  }
}
