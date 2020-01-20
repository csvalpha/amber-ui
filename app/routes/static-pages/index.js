import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { IndexRouteUnauthenticated } from 'alpha-amber/routes/application/index';

export default IndexRouteUnauthenticated.extend({
  intl: service(),
  canAccess() {
    return this.can('show static-pages');
  },
  modelName: 'static-page',
  title: computed(function() {
    return this.intl.t('model.staticPage.name.other').toString().capitalize();
  }),
  pageActions: computed(function() {
    return [
      {
        link: 'static-pages.new',
        title: 'Nieuwe infopagina',
        icon: 'plus',
        canAccess: this.can('create static-pages')
      }
    ];
  })
});
