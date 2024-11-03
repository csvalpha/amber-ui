import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ForumRoute extends AuthenticatedRoute {
  queryParams = {};

  breadcrumb = { title: 'Forum' };

  canAccess() {
    return this.abilities.can('show forum/categories');
  }
}
