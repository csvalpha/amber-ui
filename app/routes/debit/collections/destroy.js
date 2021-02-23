import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyCollectionsRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Incasso aanpassen' }

  canAccess() {
    return this.can.can('destroy debit/collections');
  }

  model(params) {
    return this.store.findRecord('debit/collection', params.id, params);
  }
}
