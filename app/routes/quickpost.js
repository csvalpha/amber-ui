import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class QuickpostRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Quickpost' }

  canAccess() {
    return this.can.can('show quickpost-messages');
  }
}
