import { inject as service } from '@ember/service';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import Route from '@ember/routing/route';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';
import BreadcrumbsRouteMixin from 'alpha-amber/mixins/breadcrumbs-route-mixin';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, AuthorizationRouteMixin, BreadcrumbsRouteMixin, FileSaverMixin, {
  title: 'Sepa downloaden',
  ajax: service('ajax'),

  canAccess() {
    return this.can('download sepa debit/collections');
  },

  model(params) {
    return this.store.findRecord('debit/collection', params.id).then(collection => {
      return this.get('ajax').request(`/debit/collections/${collection.id}/sepa`, { dataType: 'text' }).then(xmlData => {
        this.saveFileAs(`${collection.get('name')}.xml`, xmlData, 'application/xml');
        return this.transitionTo('debit.collections.show', collection.id);
      }).catch(error => {
        return error.payload.errors;
      });
    });
  }
});
