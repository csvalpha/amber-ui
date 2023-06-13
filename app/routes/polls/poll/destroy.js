import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PollDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Poll verwijderen' };

  canAccess() {
    return this.abilities.can('destroy polls');
  }
}
