import { computed } from '@ember/object';
import { IndexRouteUnauthenticated } from 'alpha-amber/routes/application/index';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';

export default IndexRouteUnauthenticated.extend(PagedModelRouteMixin, {
  canAccess() {
    return this.can.can('show polls');
  },
  modelName: 'poll',
  title: 'Polls',

  pageActions: computed(function() {
    return [
      {
        link: 'polls.new',
        title: 'Nieuwe Poll',
        icon: 'plus',
        canAccess: this.can.can('create polls')
      }
    ];
  })
});
