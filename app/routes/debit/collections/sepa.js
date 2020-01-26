import { inject as service } from '@ember/service';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import Route from '@ember/routing/route';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';
import { isInvalidResponse } from 'ember-fetch/errors';

export default Route.extend(AuthorizationRouteMixin, FileSaverMixin, {
  title: 'Sepa downloaden',
  fetch: service(),

  breadCrumb: { title: 'Sepa downloaden' },

  canAccess() {
    return this.can.can('download sepa debit/collections');
  },

  async model(params) {
    const model = await this.store.findRecord('debit/collection', params.id);
    const response = await this.fetch.fetch(`/debit/collections/${model.id}/sepa`, { dataType: 'text' });

    if (response.ok) {
      let blob = await response.blob();
      this.saveFileAs(`${model.get('name')}.xml`, blob, 'application/xml');
      return this.transitionTo('debit.collections.show', model.id);
    } else if (isInvalidResponse(response)) {
      const json = await response.json();
      return json.errors;
    }
  }
});
