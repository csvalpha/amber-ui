import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ArticleCommentDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Artikel reactie verwijderen' };

  canAccess() {
    return this.abilities.can('destroy article-comments');
  }

  async model() {
    const articleComment = this.modelFor('article-comments.article-comment');
    await articleComment.article;
    return articleComment;
  }
}
