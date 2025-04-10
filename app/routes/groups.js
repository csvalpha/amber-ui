import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class GroupsRoute extends AuthenticatedRoute {
  queryParams = {};

  breadcrumb = { title: 'Groepen' };

  canAccess() {
    return this.abilities.can('show groups');
  }
}
