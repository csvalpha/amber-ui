import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ArticleDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Artikel verwijderen' };

  canAccess() {
    return this.abilities.can('destroy articles');
  }
}
