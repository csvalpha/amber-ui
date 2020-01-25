import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';

export default Controller.extend(FilterableAndSortableMixin, {
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
    },
    { value: 'last_received_at',
      label: 'Laatst ontvangen'
    }
  ]
});
