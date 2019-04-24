import Mixin from '@ember/object/mixin';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Mixin.create(RouteMixin, {
  perPage: 10,
  /* eslint camelcase: "off" */
  paramMapping: {
    page: 'page[number]',
    perPage: 'page[size]',
    total_pages: 'page_count'
  },

  model(params) {
    params.paramMapping = this.get('paramMapping');
    return this.findPaged(this.get('modelName'), params);
  }
});
