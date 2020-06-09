import { computed } from '@ember/object';
import IndexRoute from 'alpha-amber/routes/application/index';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';

export default IndexRoute.extend(PagedModelRouteMixin, {
  canAccess() {
    return this.can.can('show debit/collections');
  },
  perPage: 15,
  modelName: 'debit/collection',
  title: 'Incasso\'s',
  pageActions: computed('can', function() {
    return [
      {
        link: 'debit.collections.new',
        title: 'Nieuwe incasso',
        icon: 'plus',
        canAccess: this.can.can('create debit/collections')
      }
    ];
  })
});

