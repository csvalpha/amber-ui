  import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';
import PagedModelControllerMixin from 'alpha-amber/mixins/paged-model-controller-mixin';

export default Controller.extend(FilterableAndSortableMixin, PagedModelControllerMixin, {
  queryParams: ['search', 'sort'],
  sortedAttribute: 'first_name',
  routeOnEnter: 'users.show',
  sortableAttributes: [
    {
      value: 'username',
      label: 'Gebruikersnaam'
    },
    {
      value: 'first_name',
      label: 'Voornaam'
    },
    {
      value: 'last_name',
      label: 'Achternaam'
    },
    {
      value: 'address',
      label: 'Adres'
    }
  ]
});
