import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ActivityDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Activiteit verwijderen' };

  canAccess() {
    return this.abilities.can('destroy activities');
  }
}
