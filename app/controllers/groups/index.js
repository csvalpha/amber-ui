import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class GroupsIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'name';

  @tracked showAdministrative = false;
  @tracked showInactive = false;

  routeOnEnter = 'groups.group';
  queryParams = {
    selectedGroupKind: 'kind',
    search: 'search',
    sort: 'sort',
    showAdministrative: 'administrative',
    showInactive: 'inactive',
  };

  sortableAttributes = [
    {
      value: 'name',
      label: 'Naam',
    },
  ];

  _selectedGroupKindOverride;

  get groupKinds() {
    if (this.search) {
      return ['zoekresultaten'];
    }

    return [
      'bestuur',
      'commissie',
      'dispuut',
      'genootschap',
      'groep',
      'huis',
      'kiemgroep',
      'werkgroep',
      'kring',
      'lichting',
      'curiositas',
    ];
  }

  get selectedGroupKind() {
    return this.search
      ? 'zoekresultaten'
      : this._selectedGroupKindOverride || this.groupKinds.firstObject;
  }

  set selectedGroupKind(value) {
    this._selectedGroupKindOverride = value;
  }
}
