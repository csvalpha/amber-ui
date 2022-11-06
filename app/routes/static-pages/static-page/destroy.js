import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class StaticPageDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Infopagina verwijderen' };

  canAccess() {
    return this.abilities.can('destroy static-pages');
  }
}
