import { computed } from '@ember/object';
import { IndexRouteUnauthenticated } from 'alpha-amber/routes/application/index';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';

export default IndexRouteUnauthenticated.extend(PagedModelRouteMixin, {
  canAccess() {
    return true;
  },
  modelName: 'article',
  perPage: 3,

  pageActions: computed(function() {
    return [
      {
        link: 'articles.new',
        title: 'Nieuw artikel',
        icon: 'plus',
        canAccess: this.can.can('create articles')
      }
    ];
  }),

  model(params) {
    params.paramMapping = this.paramMapping;
    params.sort = '-pinned,-created_at';
    return this.findPaged(this.modelName, params);
  }
});
