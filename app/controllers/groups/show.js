import GroupMembershipsController from 'alpha-amber/controllers/application/group-memberships';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class GroupsShowController extends GroupMembershipsController {
  @tracked sortedAttribute = 'user.firstName'

  filterableAttributes = [
    'user.username',
    'user.fullName',
    'function'
  ]

  sortableAttributes = [
    {
      value: 'user.firstName',
      label: 'Voornaam'
    },
    {
      value: 'user.lastName',
      label: 'Achternaam'
    },
    {
      value: 'startDate',
      label: 'Lid sinds'
    }
  ]

  @action
  selectFirstItem() {
    if (this.filteredModels.length > 0) {
      this.transitionToRoute('users.show', this.filteredModels.firstObject.user.get('id'));
    }
  }
}
