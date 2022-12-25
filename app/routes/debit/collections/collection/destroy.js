import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class CollectionDestroyRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Incasso aanpassen' };

  canAccess() {
    return this.abilities.can('destroy debit/collections');
  }
}
