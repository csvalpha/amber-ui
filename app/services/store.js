
import EmberDataStore from '@ember-data/store';

export default class StoreService extends EmberDataStore {
  perPage = 10

  async queryPaged(modelName, params) {
    let result = await this.query(modelName, this.processParams(params));
    result.meta.totalPages = result.meta.page_count;
    result.meta.page = parseInt(params.page.number, 10);

    return result;

  }

  processParams(params) {
    // Convert UI params to Backend params
    params.page = {
      number: params.page || 1,
      size: params.perPage || this.perPage
    };

    return params;
  }

}
