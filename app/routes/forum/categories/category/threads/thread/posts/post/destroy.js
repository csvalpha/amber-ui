import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PostDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Forumbericht verwijderen' };

  canAccess() {
    return this.abilities.can('destroy forum/posts');
  }
}
