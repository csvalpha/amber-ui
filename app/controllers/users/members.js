import FilterableAndSortableController from 'alpha-amber/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class UsersMembersController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'first_name';

  queryParams = ['search', 'sort'];
  routeOnEnter = 'users.show';
  sortableAttributes = [
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
}
