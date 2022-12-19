import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ThreadDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Topic verwijderen' };

  canAccess() {
    return this.abilities.can('destroy forum/threads');
  }
}
