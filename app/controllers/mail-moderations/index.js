import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';

export default Controller.extend(FilterableAndSortableMixin, {
  sortedAttribute: 'received_at',
  routeOnEnter: 'mail-moderations.show'
});
