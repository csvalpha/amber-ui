import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DestroyCollectionsRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Incasso aanpassen' };

  canAccess() {
    return this.abilities.can('destroy debit/collections');
  }

  model(params) {
    return this.store.findRecord('debit/collection', params.id, params);
  }
}
