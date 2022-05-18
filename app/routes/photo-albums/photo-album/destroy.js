import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyArticleRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Foto album verwijderen' };

  canAccess() {
    return this.abilities.can('destroy photo-albums');
  }

  model() {
    return this.modelFor('photo-albums.photo-album');
  }
}
