import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { capitalize } from '@ember/string';
import { IndexRouteUnauthenticated } from 'alpha-amber/routes/application/index';

export default IndexRouteUnauthenticated.extend({
  intl: service(),
  canAccess() {
    return this.can.can('show static-pages');
  },
  modelName: 'static-page',
  title: computed(function() {
    return capitalize(this.intl.t('model.staticPage.name.other').toString());
  }),
  pageActions: computed('can', function() {
    return [
      {
        link: 'static-pages.new',
        title: 'Nieuwe infopagina',
        icon: 'plus',
        canAccess: this.can.can('create static-pages')
      }
    ];
  })
});
