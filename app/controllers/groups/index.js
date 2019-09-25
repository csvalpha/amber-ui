import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';
import { computed } from '@ember/object';

export default Controller.extend(FilterableAndSortableMixin, {
  queryParams: {
    selectedGroupKind: 'kind',
    search: 'search',
    sort: 'sort',
    showAdministrative: 'administrative',
    showInactive: 'inactive'
  },
  routeOnEnter: 'groups.show',
  sortableAttributes: [
    {
      value: 'name',
      label: 'Naam'
    }
  ],
  sortedAttribute: 'name',
  groupKinds: computed('search', function() {
    if (this.search) {
      return ['zoekresultaten'];
    }
    return ['bestuur', 'commissie', 'dispuut', 'genootschap', 'groep', 'huis', 'jaargroep', 'werkgroep', 'kring', 'lichting'];
  }),
  selectedGroupKind: computed('search', {
    get() {
      if (this.search) {
        return 'zoekresultaten';
      }
      return this.get('groupKinds.firstObject');
    },
    set(key, value) {
      return value;
    }
  }),
  showAdministrative: false,
  showInactive: false
});
