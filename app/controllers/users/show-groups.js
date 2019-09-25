import Controller from '@ember/controller';
import GroupMembershipsMixin from 'alpha-amber/mixins/group-memberships-mixin';
import { computed } from '@ember/object';

export default Controller.extend(GroupMembershipsMixin, {
  filterableAttributes: [
    'group.name'
  ],
  sortableAttributes: [
    {
      value: 'group.name',
      label: 'Titel'
    }
  ],
  sortedAttribute: 'group.name',
  showAdministrativeGroups: false,
  filteredModelsWithAdministrative: computed('filteredModels', 'showAdministrativeGroups', 'filteredModels.@each.administrative', function() {
    const showAdministrativeGroups = this.showAdministrativeGroups;
    return this.filteredModels.filter((model) => {
      const administrative = model.get('administrative');
      return ((administrative && showAdministrativeGroups) || administrative === false);
    });
  })
});
