import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyArticleRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Artikel verwijderen' };

  canAccess() {
    return this.abilities.can('destroy articles');
  }

  model(params) {
    return this.store.findRecord('article', params.id, params);
  }
}
