import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { assign } from '@ember/polyfills';
import { hash } from 'rsvp';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can.can('show debit/collections');
  },
  modelName: 'debit/collection',
  title: alias('controller.model.collection.name'),
  parents: ['debit.collection.index'],
  pageActions: computed('controller.model', function() {
    const collection = this.get('controller.model.collection');
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
  }),
  model(params) {
    const collectionPromise = this.store.findRecord(this.modelName, params.id);
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
});
