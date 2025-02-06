import { AuthenticatedRoute } from 'amber-ui/routes/application/application';
import { isInvalidResponse } from 'ember-fetch/errors';
import { inject as service } from '@ember/service';

export default class CollectionSepaRoute extends AuthenticatedRoute {
  @service fetch;
  @service fileSaver;

  breadcrumb = { title: 'SEPA downloaden' };

  canAccess() {
    return this.abilities.can('download sepa debit/collections');
  }

  async model() {
    const model = this.modelFor('debit.collections.collection');
    const response = await this.fetch.fetch(
      `/debit/collections/${model.id}/sepa`,
      { dataType: 'text' }
    );

    if (response.ok) {
      const blob = await response.blob();
      this.fileSaver.saveFileAs(
        `${model.get('name')}.zip`,
        blob,
        'application/zip'
      );
      return this.transitionTo('debit.collections.collection', model.id);
    } else if (isInvalidResponse(response)) {
      const json = await response.json();
      return json.errors;
    }
  }
}
