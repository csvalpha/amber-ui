import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyArticleRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Fotoreactie verwijderen' }

  canAccess() {
    return this.abilities.can('destroy photo-comments');
  }

  model(params) {
    return this.store.findRecord('photo-comment', params.id, params);
  }
}
