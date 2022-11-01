import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class QuickpostRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Quickpost' };

  canAccess() {
    return this.abilities.can('show quickpost-messages');
  }
}
