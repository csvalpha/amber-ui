import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyArticleRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Foto verwijderen' };

  canAccess() {
    return this.abilities.can('destroy photos');
  }

  model(params) {
    return this.store.findRecord('photo', params.photo_id, params);
  }
}
