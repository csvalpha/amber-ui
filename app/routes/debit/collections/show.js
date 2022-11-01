import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class CollectionsIndexRoute extends AuthenticatedRoute {
  get breadcrumb() {
    return { title: this.controller.model.name };
  }

  get pageActions() {
    const collection = this.controller.model;
    return [
      {
        link: 'debit.collections.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: collection,
        canAccess: this.abilities.can('edit debit/collections'),
      },
      {
        link: 'debit.collections.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: collection,
        canAccess: this.abilities.can('destroy debit/collections'),
      },
      {
        link: 'debit.collections.sepa',
        title: 'SEPA bestand downloaden',
        icon: 'download',
        linkArgument: collection.id,
        canAccess: this.abilities.can('download sepa debit/collections'),
      },
    ];
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
