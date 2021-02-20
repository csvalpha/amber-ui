import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';
import { assign } from '@ember/polyfills';
import { hash } from 'rsvp';

export default class CollectionsIndexRoute extends AuthenticatedRoute {
  get breadCrumb() {
    return { title: this.controller.model.collection.name };
  }

  get pageActions() {
    const { collection } = this.controller.model;
    return [
      {
        link: 'debit.collections.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: collection,
        canAccess: this.can.can('edit debit/collections')
      },
      {
        link: 'debit.collections.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: collection,
        canAccess: this.can.can('destroy debit/collections')
      },
      {
        link: 'debit.collections.sepa',
        title: 'SEPA bestand downloaden',
        icon: 'download',
        linkArgument: collection,
        canAccess: this.can.can('download sepa debit/collections')
      }
    ];
  }

  canAccess() {
    return this.can.can('show debit/collections');
  }

  model(params) {
    const collectionPromise = this.store.findRecord('debit/collection', params.id);
    assign(params, {
      paramMapping: this.paramMapping,
      filter: { collection: params.id },
      sort: 'created_at'
    });
    delete params.id;
    const transactionsPromise = this.store.query('debit/transaction', params);

    return hash({
      collection: collectionPromise,
      transactions: transactionsPromise
    });
  }
}
