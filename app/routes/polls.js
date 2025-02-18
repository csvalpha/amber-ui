import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PollsRoute extends AuthenticatedRoute {
  queryParams = {};

  breadcrumb = { title: 'Polls' };

  canAccess() {
    return this.abilities.can('show polls');
  }
}
