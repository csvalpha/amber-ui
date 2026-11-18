import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DeclarationsRoute extends AuthenticatedRoute {
  queryParams = {};

  breadcrumb = { title: 'Declaraties' };

  canAccess() {
    return this.abilities.can('show declarations');
  }
}
