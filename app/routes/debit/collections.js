import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class CollectionsRoute extends AuthenticatedRoute {
  queryParams = {};

  breadcrumb = { title: "Incasso's" };

  canAccess() {
    return this.abilities.can('show forum/categories');
  }
}
