import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { IndexRouteUnauthenticated } from 'alpha-amber/routes/application/index';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';

export default IndexRouteUnauthenticated.extend(PagedModelRouteMixin, {
  i18n: service(),
  canAccess() {
    return this.can('show articles');
  },

  modelName: 'article',

  title: computed(function() {
    return this.get('i18n').t('model.article.name.other').toString().capitalize();
  }),

  pageActions: computed(function() {
    return [
      {
        link: 'articles.new',
        title: 'Nieuw artikel',
        icon: 'plus',
        canAccess: this.can('create articles')
      }
    ];
  })
});
