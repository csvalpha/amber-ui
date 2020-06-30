import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { IndexRouteUnauthenticated } from 'alpha-amber/routes/application/index';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';

export default IndexRouteUnauthenticated.extend(PagedModelRouteMixin, {
  intl: service(),
  canAccess() {
    return this.can.can('show articles');
  },

  modelName: 'article',

  title: computed(function() {
    return this.intl.t('model.article.name.other').toString().capitalize();
  }),

  pageActions: computed('can', function() {
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
    params.sort = `-pinned,${params.sort}`;
    return this.findPaged(this.modelName, params);
  }
});
