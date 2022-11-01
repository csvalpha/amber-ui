import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyArticleRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Artikel verwijderen' };

  canAccess() {
    return this.abilities.can('destroy articles');
  }

  model(params) {
    return this.store.findRecord('article', params.id, params);
  }
}
