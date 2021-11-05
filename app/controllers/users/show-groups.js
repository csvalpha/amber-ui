import GroupMembershipsController from 'alpha-amber/controllers/application/group-memberships';
import { tracked } from '@glimmer/tracking';

export default class UsersShowGroupsController extends GroupMembershipsController {
  @tracked sortedAttribute = 'group.name'
  @tracked showAdministrativeGroups = false

  filterableAttributes = [
    'group.name'
  ]

  sortableAttributes = [
    {
      value: 'group.name',
      label: 'Titel'
    }
  ]

  get filteredModelsWithAdministrative() {
    return this.filteredModels.filter(model => {
      const { administrative } = model;
      return ((administrative && this.showAdministrativeGroups) || administrative === false);
    });
  }
}
