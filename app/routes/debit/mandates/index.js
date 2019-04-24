import IndexRoute from 'alpha-amber/routes/application/index';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';
import { computed } from '@ember/object';

export default IndexRoute.extend(PagedModelRouteMixin, {
  canAccess() {
    return this.can('show debit/mandates');
  },
  perPage: 15,
  modelName: 'debit/mandate',
  title: 'Mandaten',
  pageActions: computed(function() {
    return [
      {
        link: 'debit.mandates.new',
        title: 'Nieuwe mandaat',
        icon: 'plus',
        canAccess: this.can('create debit/mandates')
      }
    ];
  })
});
