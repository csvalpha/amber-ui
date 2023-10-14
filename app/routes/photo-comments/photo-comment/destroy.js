import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PhotoCommentDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Foto reactie verwijderen' };

  canAccess() {
    return this.abilities.can('destroy photo-comments');
  }
}
