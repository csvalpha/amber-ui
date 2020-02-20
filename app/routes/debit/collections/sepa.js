import { inject as service } from '@ember/service';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import Route from '@ember/routing/route';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';
export default Route.extend(AuthorizationRouteMixin, FileSaverMixin, {
  title: 'Sepa downloaden',
  ajax: service('ajax'),

  breadCrumb: { title: 'Sepa downloaden' },

  canAccess() {
    return this.can.can('download sepa debit/collections');
  },

  model(params) {
    return this.store.findRecord('debit/collection', params.id).then(collection => {
      return this.ajax.request(`/debit/collections/${collection.id}/sepa`, { dataType: 'text' }).then(xmlData => {
        this.saveFileAs(`${collection.get('name')}.xml`, xmlData, 'application/xml');
        return this.transitionTo('debit.collections.show', collection.id);
      }).catch(error => {
        return error.payload.errors;
      });
    });
  }
});
