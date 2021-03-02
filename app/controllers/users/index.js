import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';

export default Controller.extend(FilterableAndSortableMixin, {
  queryParams: ['search', 'sort', 'page'],
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
