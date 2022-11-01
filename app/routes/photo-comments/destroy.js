import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyArticleRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Fotoreactie verwijderen' };

  canAccess() {
    return this.abilities.can('destroy photo-comments');
  }

  model(params) {
    return this.store.findRecord('photo-comment', params.id, params);
  }
}
