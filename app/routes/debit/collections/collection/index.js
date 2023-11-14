import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class CollectionIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    const collection = this.controller.model;
    return [
      {
        link: 'debit.collections.collection.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: collection,
        canAccess: this.abilities.can('edit debit/collections'),
      },
      {
        link: 'debit.collections.collection.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: collection,
        canAccess: this.abilities.can('destroy debit/collections'),
      },
      {
        link: 'debit.collections.collection.sepa',
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

  async model() {
    const collection = this.modelFor('debit.collections.collection');
    await collection.transactions;
    // todo: simplify this to just returning collection, because transactions can be gotten from the collection, right?
    return collection;
  }
}
