import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class UserDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Lid verwijderen' };

  canAccess(model) {
    return this.abilities.can('destroy user', model);
  }
}
