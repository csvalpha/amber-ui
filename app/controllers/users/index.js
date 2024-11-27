import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class UsersIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'first_name';

  queryParams = ['search', 'sort', 'page'];

  routeOnEnter = 'users.user';
  sortableAttributes = [
    {
      value: 'username',
      label: 'Gebruikersnaam',
    },
    {
      value: 'first_name',
      label: 'Voornaam',
    },
    {
      value: 'last_name',
      label: 'Achternaam',
    },
    {
      value: 'startDate',
      label: 'Lid sinds',
    },
    {
      value: 'address',
      label: 'Adres',
    },
  ];
}
