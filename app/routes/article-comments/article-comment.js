import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ArticleCommentRoute extends AuthenticatedRoute {
  queryParams = {};

  canAccess() {
    return this.abilities.can('show article-comments');
  }

  model(params) {
    return this.store.findRecord('article-comment', params.id, params);
  }
}
