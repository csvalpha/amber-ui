import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';

export default Controller.extend(FilterableAndSortableMixin, {
  ajax: service(),
  queryParams: ['search', 'sort'],
  sortedAttribute: 'email',
  routeOnEnter: 'users.show',
  sortableAttributes: [
    {
      value: 'email',
      label: 'E-mail'
    },
    { value: 'moderation_type',
      label: 'Moderatie type'
    },
    { value: 'smtp_enabled',
      label: 'SMTP'
    }
  ]
});
