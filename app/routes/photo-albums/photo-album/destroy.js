import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyArticleRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Foto album verwijderen' }

  canAccess() {
    return this.can.can('destroy photo-albums');
  }

  model() {
    return this.modelFor('photo-albums.photo-album');
  }
}
