import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';
import { inject as service } from '@ember/service';
import { isInvalidResponse } from 'ember-fetch/errors';

export default class SepaRoute extends AuthenticatedRoute {
  @service fetch
  @service('file-saver') fileSaver

  breadCrumb = { title: 'Sepa downloaden' }

  canAccess() {
    return this.abilities.can('download sepa debit/collections');
  }

  async model(params) {
    const model = await this.store.findRecord('debit/collection', params.id);
    const response = await this.fetch.fetch(`/debit/collections/${model.id}/sepa`, { dataType: 'text' });

    if (response.ok) {
      let blob = await response.blob();
      this.fileSaver.saveFileAs(`${model.get('name')}.xml`, blob, 'application/xml');
      return this.transitionTo('debit.collections.show', model.id);
    } else if (isInvalidResponse(response)) {
      const json = await response.json();
      return json.errors;
    }
  }
}
