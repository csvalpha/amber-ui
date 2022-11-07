import GroupMembershipsController from 'amber-ui/controllers/application/group-memberships';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UsersShowGroupsController extends GroupMembershipsController {
  @tracked sortedAttribute = 'group.name';
  @tracked showAdministrativeGroups = false;

  filterableAttributes = ['group.name'];

  sortableAttributes = [
    {
      value: 'group.name',
      label: 'Titel',
    },
  ];

  get filteredModelsWithAdministrative() {
    return this.filteredModels.filter((model) => {
      const { administrative } = model;
      return (
        (administrative && this.showAdministrativeGroups) ||
        administrative === false
      );
    });
  }

  @action
  selectFirstItem() {
    if (this.filteredModels.length > 0) {
      this.transitionToRoute(
        'groups.group',
        this.filteredModels.firstObject.group.get('id')
      );
    }
  }
}
