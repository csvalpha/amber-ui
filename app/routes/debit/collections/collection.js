import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class CollectionRoute extends AuthenticatedRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller?.model.name };
  }

  canAccess() {
    return this.abilities.can('show debit/collections');
  }

  async model(params) {
    const collection = await this.store.findRecord(
      'debit/collection',
      params.id
    );
    await collection.transactions;
    // todo: simplify this to just returning collection, because transactions can be gotten from the collection, right?
    return collection;
  }
}
